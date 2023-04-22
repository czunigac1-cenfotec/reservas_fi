package ac.cr.ucr.controller;

import ac.cr.ucr.controller.customResponse.ReservationGroupResponse;
import ac.cr.ucr.logic.service.ReservationGroupService;
import ac.cr.ucr.model.ReservationGroup;
import ac.cr.ucr.repository.functional.ReservationGroupInterface;
import ac.cr.ucr.repository.functional.ReservationInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/reservation-groups")
public class ReservationGroupController {

    @Autowired
    private ReservationGroupInterface reservationGroupInterface;

    @Autowired
    private ReservationInterface reservationInterface;

    @Autowired
    private ReservationGroupService reservationGroupBroker;

    @GetMapping
    public ResponseEntity<List<ReservationGroup>> getAllReservationGroups() {
        List<ReservationGroup> reservationGroups = reservationGroupInterface.findAllReservationGroups();
        return new ResponseEntity<>(reservationGroups, HttpStatus.OK);
    }

    @GetMapping("/{reservationGroupId}")
    public ResponseEntity<ReservationGroup> getReservationGroupById(@PathVariable("reservationGroupId") UUID reservationGroupId) {
        ReservationGroup reservationGroup = reservationGroupInterface.findReservationGroup(reservationGroupId);
        if (reservationGroup != null) {
            return new ResponseEntity<>(reservationGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ReservationGroupResponse> createReservationGroup(@RequestBody String scheduleJson) {
        ReservationGroupResponse response = reservationGroupBroker.createReservationGroupWithReservations(scheduleJson);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{reservationGroupId}")
    public ResponseEntity<ReservationGroup> updateReservationGroup(@PathVariable("reservationGroupId") UUID reservationGroupUuid,
                                                                   @RequestBody ReservationGroup reservationGroup) {
        ReservationGroup updatedReservationGroup = reservationGroupInterface.updateReservationGroup(reservationGroup, reservationGroupUuid);
        if (updatedReservationGroup != null) {
            return new ResponseEntity<>(updatedReservationGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{reservationGroupId}")
    public ResponseEntity<HttpStatus> deleteReservationGroup(@PathVariable("reservationGroupId") UUID reservationGroupId) {
        boolean result = reservationGroupInterface.deleteReservationGroup(reservationGroupId);
        if (result) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
