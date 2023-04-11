package ac.cr.ucr.logic.controllerBroker;

import ac.cr.ucr.controller.customResponse.ReservationGroupResponse;
import ac.cr.ucr.model.*;
import ac.cr.ucr.service.ReservationGroupService;
import ac.cr.ucr.service.ReservationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import javax.persistence.Tuple;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class ReservationGroupBroker {

    private ReservationGroupService reservationGroupService;

    private ReservationService reservationService;

    public ReservationGroupBroker(ReservationGroupService reservationGroupService, ReservationService reservationService) {
        this.reservationGroupService = reservationGroupService;
        this.reservationService = reservationService;
    }

    public ReservationGroupBroker() {
    }

    public ReservationGroupService getReservationGroupService() {
        return reservationGroupService;
    }

    public void setReservationGroupService(ReservationGroupService reservationGroupService) {
        this.reservationGroupService = reservationGroupService;
    }

    public ReservationService getReservationService() {
        return reservationService;
    }

    public void setReservationService(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    public ReservationGroupResponse createReservationGroupWithReservations(String json) {
        ReservationGroupBroker reservationGroupBroker = new ReservationGroupBroker(
                this.reservationGroupService, this.reservationService
        );
        Schedule reservationGroupSchedule = reservationGroupBroker.interpretReservationSchedule(json);
        ReservationGroup reservationGroup = reservationGroupBroker.createReservationGroupFromSchedule(reservationGroupSchedule);
        List<Reservation> reservations = reservationGroupBroker.createReservations(reservationGroup.getReservationGroupUuid(), reservationGroupSchedule);
        List<UUID> reservationUuids = reservations.stream()
                .map(Reservation::getReservationUuid)
                .collect(Collectors.toList());
        reservationGroup.setReservationUuids(reservationUuids);
        reservationGroupService.updateReservationGroup(reservationGroup, reservationGroup.getReservationGroupUuid());
        return new ReservationGroupResponse(reservationGroup, reservations);
    }

    public Schedule interpretReservationSchedule(String scheduleJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Schedule reservationGroupSchedule = objectMapper.readValue(scheduleJson, Schedule.class);
            return reservationGroupSchedule;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Reservation> createReservations (UUID reservationGroupUuid, Schedule reservationGroupSchedule){
        List<Reservation> reservations = new ArrayList<>();
        for (Day day :
                reservationGroupSchedule.getWeekdays()) {
            for (WeekdayEvent weekdayEvent :
                    day.getWeekdayEvents()) {
                Reservation newReservation = new Reservation(
                        reservationGroupUuid,
                        weekdayEvent.getStartDateTime(),
                        weekdayEvent.getEndDateTime(),
                        reservationGroupSchedule.getUserUuid(),
                        weekdayEvent.getRoomUuid()
                );
                Reservation savedReservation = reservationService.addReservation(newReservation);
                reservations.add((savedReservation));
            }
        }
        return reservations;
    }

    public ReservationGroup createReservationGroupFromSchedule (Schedule reservationGroupSchedule) {
        List<UUID> reservationUuids = new ArrayList<>();
        ReservationGroup createdReservationGroup = new ReservationGroup(
                reservationGroupSchedule.getUserUuid(),
                reservationUuids

        );
        return reservationGroupService.addReservationGroup(createdReservationGroup);
    }
}
