package ac.cr.ucr.logic.service;

import ac.cr.ucr.controller.customResponse.ReservationGroupResponse;
import ac.cr.ucr.model.*;
import ac.cr.ucr.repository.functional.ReservationGroupInterface;
import ac.cr.ucr.repository.functional.ReservationInterface;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import java.util.*;
import java.util.stream.Collectors;

@Controller
public class ReservationGroupService {

    private ReservationGroupInterface reservationGroupInterface;

    private ReservationInterface reservationInterface;

    private RoomAvailabilityService roomAvailabilityService;

    @Autowired
    public ReservationGroupService(
            ReservationGroupInterface reservationGroupInterface,
            ReservationInterface reservationInterface,
            RoomAvailabilityService roomAvailabilityService) {
        this.reservationGroupInterface = reservationGroupInterface;
        this.reservationInterface = reservationInterface;
        this.roomAvailabilityService = roomAvailabilityService;
    }

    public ReservationGroupService() {
    }

    public ReservationGroupInterface getReservationGroupInterface() {
        return reservationGroupInterface;
    }

    public void setReservationGroupInterface(ReservationGroupInterface reservationGroupInterface) {
        this.reservationGroupInterface = reservationGroupInterface;
    }

    public ReservationInterface getReservationInterface() {
        return reservationInterface;
    }

    public void setReservationInterface(ReservationInterface reservationInterface) {
        this.reservationInterface = reservationInterface;
    }

    public RoomAvailabilityService getRoomAvailabilityService() {
        return roomAvailabilityService;
    }

    public void setRoomAvailabilityService(RoomAvailabilityService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }

    public ReservationGroupInterface getReservationGroupService() {
        return reservationGroupInterface;
    }

    public void setReservationGroupService(ReservationGroupInterface reservationGroupInterface) {
        this.reservationGroupInterface = reservationGroupInterface;
    }

    public ReservationInterface getReservationService() {
        return reservationInterface;
    }

    public void setReservationService(ReservationInterface reservationInterface) {
        this.reservationInterface = reservationInterface;
    }

    public ReservationGroupResponse createReservationGroupWithReservations(String json) {
        ReservationGroupService reservationGroupBroker = new ReservationGroupService(
                this.reservationGroupInterface,
                this.reservationInterface,
                this.roomAvailabilityService
        );
        Schedule reservationGroupSchedule = reservationGroupBroker.interpretReservationSchedule(json);
        ReservationGroup reservationGroup = reservationGroupBroker.createReservationGroupFromSchedule(reservationGroupSchedule);
        List<Reservation> reservations = reservationGroupBroker.createReservations(reservationGroup.getReservationGroupUuid(), reservationGroupSchedule);
        List<UUID> reservationUuids = reservations.stream()
                .map(Reservation::getReservationUuid)
                .collect(Collectors.toList());
        reservationGroup.setReservationUuids(reservationUuids);
        reservationGroupInterface.updateReservationGroup(reservationGroup, reservationGroup.getReservationGroupUuid());
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

    public List<Reservation> createReservations(UUID reservationGroupUuid, Schedule reservationGroupSchedule) {
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
                if (roomAvailabilityService.isRoomAvailable(newReservation)) {
                    Reservation savedReservation = reservationInterface.addReservation(newReservation);
                    reservations.add((savedReservation));
                }
            }
        }
        return reservations;
    }

    public ReservationGroup createReservationGroupFromSchedule(Schedule reservationGroupSchedule) {
        List<UUID> reservationUuids = new ArrayList<>();
        ReservationGroup createdReservationGroup = new ReservationGroup(
                reservationGroupSchedule.getUserUuid(),
                reservationUuids

        );
        return reservationGroupInterface.addReservationGroup(createdReservationGroup);
    }
}
