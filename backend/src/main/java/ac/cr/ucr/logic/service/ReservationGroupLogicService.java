package ac.cr.ucr.logic.service;

import ac.cr.ucr.controller.customRequest.Day;
import ac.cr.ucr.controller.customRequest.ScheduleRequest;
import ac.cr.ucr.controller.customRequest.WeekdayEvent;
import ac.cr.ucr.controller.customResponse.ReservationGroupResponse;
import ac.cr.ucr.model.*;
import ac.cr.ucr.service.ReservationGroupService;
import ac.cr.ucr.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;
@Service
public class ReservationGroupLogicService {

    @Autowired
    private ReservationGroupService reservationGroupService;
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private RoomAvailabilityLogicService roomAvailabilityService;


    public ReservationGroupLogicService() {
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

    public RoomAvailabilityLogicService getRoomAvailabilityService() {
        return roomAvailabilityService;
    }

    public void setRoomAvailabilityService(RoomAvailabilityLogicService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }


    public ReservationGroupResponse createReservationGroupWithReservations(ScheduleRequest reservationGroupSchedule) {
        //ScheduleRequest reservationGroupSchedule = reservationGroupService.interpretReservationSchedule(json);
        ReservationGroup reservationGroup = this.createReservationGroupFromSchedule(reservationGroupSchedule);
        List<Reservation> reservations = this.createReservations(reservationGroup.getReservationGroupUuid(), reservationGroupSchedule);
        List<UUID> reservationUuids = reservations.stream()
                .map(Reservation::getReservationUuid)
                .collect(Collectors.toList());
        reservationGroup.setReservationUuids(reservationUuids);
        this.reservationGroupService.updateReservationGroup(reservationGroup, reservationGroup.getReservationGroupUuid());
        return new ReservationGroupResponse(reservationGroup, reservations);
    }

    public List<Reservation> createReservations(UUID reservationGroupUuid, ScheduleRequest reservationGroupScheduleRequest) {
        List<Reservation> reservations = new ArrayList<>();
        for (Day day :
                reservationGroupScheduleRequest.getWeekdays()) {
            for (WeekdayEvent weekdayEvent :
                    day.getWeekdayEvents()) {
                Reservation newReservation = new Reservation(
                        reservationGroupUuid,
                        weekdayEvent.getStartDateTime(),
                        weekdayEvent.getEndDateTime(),
                        reservationGroupScheduleRequest.getUserUuid(),
                        weekdayEvent.getRoomUuid(),
                        weekdayEvent.getNotes(),
                        weekdayEvent.getMotive()
                );
                if (roomAvailabilityService.isRoomAvailable(newReservation)) {
                    Reservation savedReservation = reservationService.addReservation(newReservation);
                    reservations.add((savedReservation));
                }
            }
        }
        return reservations;
    }

    public ReservationGroup createReservationGroupFromSchedule(ScheduleRequest reservationGroupScheduleRequest) {
        List<UUID> reservationUuids = new ArrayList<>();
        ReservationGroup createdReservationGroup = new ReservationGroup(
                reservationGroupScheduleRequest.getUserUuid(),
                reservationUuids

        );
        return reservationGroupService.addReservationGroup(createdReservationGroup);
    }
}
