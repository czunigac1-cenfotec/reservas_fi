package ac.cr.ucr.controller;

import ac.cr.ucr.model.*;
import ac.cr.ucr.repository.ReservationRepositoryI;
import ac.cr.ucr.service.ReservationGroupService;
import ac.cr.ucr.controller.ReservationController;
import ac.cr.ucr.service.ReservationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/reservation-groups")
public class ReservationGroupController {

    @Autowired
    private ReservationGroupService reservationGroupService;

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationGroup>> getAllReservationGroups() {
        List<ReservationGroup> reservationGroups = reservationGroupService.findAllReservationGroups();
        return new ResponseEntity<>(reservationGroups, HttpStatus.OK);
    }

    @GetMapping("/{reservationGroupId}")
    public ResponseEntity<ReservationGroup> getReservationGroupById(@PathVariable("reservationGroupId") UUID reservationGroupId) {
        ReservationGroup reservationGroup = reservationGroupService.findReservationGroup(reservationGroupId);
        if (reservationGroup != null) {
            return new ResponseEntity<>(reservationGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ReservationGroup> createReservationGroup(@RequestBody String scheduleJson) {
        List<UUID> reservationUuids = new ArrayList<>();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Schedule reservation_group_schedule = objectMapper.readValue(scheduleJson, Schedule.class);
            ReservationGroup createdReservationGroup = new ReservationGroup(
                    reservation_group_schedule.getUserUuid(),
                    reservationUuids

            );
            ReservationGroup savedReservationGroup = reservationGroupService.addReservationGroup(createdReservationGroup);
            for (Day day :
                    reservation_group_schedule.getWeekdays()) {
                for (WeekdayEvent weekdayEvent :
                        day.getWeekdayEvents()) {
                    Reservation newReservation = new Reservation(
                            savedReservationGroup.getReservationGroupUuid(),
                            weekdayEvent.getStartDateTime(),
                            weekdayEvent.getEndDateTime(),
                            reservation_group_schedule.getUserUuid(),
                            weekdayEvent.getRoomUuid()
                    );
                    Reservation savedReservation = reservationService.addReservation(newReservation);
                    reservationUuids.add(savedReservation.getReservationUuid());
                }

            }
            createdReservationGroup.setReservationUuids(reservationUuids);
            reservationGroupService.updateReservationGroup(createdReservationGroup, createdReservationGroup.getReservationGroupUuid());
            return new ResponseEntity<>(createdReservationGroup, HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{reservationGroupId}")
    public ResponseEntity<ReservationGroup> updateReservationGroup(@PathVariable("reservationGroupId") UUID reservationGroupUuidd,
                                                                   @RequestBody ReservationGroup reservationGroup) {
        ReservationGroup updatedReservationGroup = reservationGroupService.updateReservationGroup(reservationGroup, reservationGroupUuidd);
        if (updatedReservationGroup != null) {
            return new ResponseEntity<>(updatedReservationGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{reservationGroupId}")
    public ResponseEntity<HttpStatus> deleteReservationGroup(@PathVariable("reservationGroupId") UUID reservationGroupId) {
        boolean result = reservationGroupService.deleteReservationGroup(reservationGroupId);
        if (result) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
