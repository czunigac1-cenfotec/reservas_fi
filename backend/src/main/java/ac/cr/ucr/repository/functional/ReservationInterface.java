package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.Reservation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ReservationInterface {
    Reservation findReservation(UUID reservationId);

    List<Reservation> findAllReservations();

    Reservation addReservation(Reservation reservation);

    Reservation updateReservation(Reservation reservation, UUID reservationId);

    List<Reservation> findByRoomUuid(UUID roomUuid);

    List<Reservation> findReservationByStartDateEndDate(UUID roomUuid, LocalDateTime startDate, LocalDateTime endDate);

    boolean deleteReservation(UUID reservationId);
}
