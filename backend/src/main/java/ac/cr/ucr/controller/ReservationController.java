package ac.cr.ucr.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import ac.cr.ucr.logic.service.RoomAvailabilityLogicService;
import ac.cr.ucr.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.cr.ucr.model.Reservation;

@RequestMapping("/reservation")
@CrossOrigin
@RestController
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RoomAvailabilityLogicService roomAvailabilityService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return this.reservationService.findAllReservations();
    }

    @GetMapping("/room-uuid/{roomUuid}/start-date/{startDate}/end-date/{endDate}")
    public List<Reservation> getReservationsByStartDateEndDate(
            @PathVariable("roomUuid")UUID roomUuid,
            @PathVariable("startDate")LocalDateTime startDate,
            @PathVariable("endDate")LocalDateTime endDate) {
        return this.reservationService.findReservationByStartDateEndDate(roomUuid, startDate, endDate);
    }

    @GetMapping("/{uuid}")
    public Reservation getReservation(@PathVariable("uuid") UUID reservationId) {
        return this.reservationService.findReservation(reservationId);
    }

    @PostMapping
    public Reservation addReservation(@RequestBody Reservation reservation) {
        if (roomAvailabilityService.isRoomAvailable(reservation)) {
            return this.reservationService.addReservation(reservation);
        }
        return null;
    }

    @PutMapping("/{uuid}")
    public Reservation updateReservation(@PathVariable("uuid") UUID reservationId,
                                         @RequestBody Reservation reservation) {
        return this.reservationService.updateReservation(reservation, reservationId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteReservation(@PathVariable("uuid") UUID reservationId) {
        return this.reservationService.deleteReservation(reservationId);
    }

    public Reservation createReservation(Reservation newReservation) {
        if (roomAvailabilityService.isRoomAvailable(newReservation)) {
            return this.reservationService.addReservation(newReservation);
        }
        return null;
    }
}
