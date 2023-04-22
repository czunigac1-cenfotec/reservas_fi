package ac.cr.ucr.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.repository.functional.AvailabilityPeriodInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.repository.functional.ReservationInterface;

@Service("reservation")
public class ReservationRepositoryI implements ReservationInterface {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private AvailabilityPeriodInterface availabilityPeriodInterface;

    @Override
    public Reservation findReservation(UUID reservationId) {
        Optional<Reservation> reservation = repository.findById(reservationId);
        return reservation.isPresent() ? reservation.get() : null;
    }

    @Override
    public List<Reservation> findAllReservations() {
        return repository.findAll();
    }

    @Override
    public List<Reservation> findReservationByStartDateEndDate(UUID roomUuid, LocalDateTime startDate, LocalDateTime endDate) {
        return repository.findByRoomUuidStartDateEndDate(roomUuid, startDate, endDate);
    }


    @Override
    public Reservation addReservation(Reservation reservation) {
        return repository.save(reservation);
    }

    @Override
    public Reservation updateReservation(Reservation reservation, UUID reservationId) {
        Optional<Reservation> existingReservation = repository.findById(reservationId);
        if (existingReservation.isPresent()) {
            Reservation updatedReservation = existingReservation.get();
            updatedReservation.setStartDateTime(reservation.getStartDateTime());
            updatedReservation.setEndDateTime(reservation.getEndDateTime());
            updatedReservation.setResourceUuids(reservation.getResourceUuids());
            return repository.save(updatedReservation);
        }
        return null;
    }

    @Override
    public List<Reservation> findByRoomUuid(UUID roomUuid) {
        return repository.findByRoomUuid(roomUuid);
    }

    @Override
    public boolean deleteReservation(UUID reservationId) {
        Optional<Reservation> existingReservation = repository.findById(reservationId);
        if (existingReservation.isPresent()) {
            repository.delete(existingReservation.get());
            return true;
        }
        return false;
    }
}
