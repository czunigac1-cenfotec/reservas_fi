package ac.cr.ucr.service;

import ac.cr.ucr.model.Reservation;

import java.util.List;
import java.util.UUID;

public interface ReservationService {
    Reservation findReservation(UUID reservationId);

    List<Reservation> findAllReservations();

    Reservation addReservation(Reservation reservation);

    Reservation updateReservation(Reservation reservation, UUID reservationId);

    boolean deleteReservation(UUID reservationId);
}
