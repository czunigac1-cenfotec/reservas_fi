package ac.cr.ucr.controller;

import ac.cr.ucr.model.ReservationGroup;
import ac.cr.ucr.service.ReservationGroupService;
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
    private ReservationGroupService reservationGroupService;

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
    public ResponseEntity<ReservationGroup> createReservationGroup(@RequestBody ReservationGroup reservationGroup) {
        ReservationGroup createdReservationGroup = reservationGroupService.addReservationGroup(reservationGroup);
        return new ResponseEntity<>(createdReservationGroup, HttpStatus.CREATED);
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
