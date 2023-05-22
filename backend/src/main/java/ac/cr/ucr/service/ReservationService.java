package ac.cr.ucr.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import ac.cr.ucr.model.Reservation;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    public Reservation findReservation(UUID reservationId) {
        Optional<Reservation> reservation = repository.findById(reservationId);
        return reservation.isPresent() ? reservation.get() : null;
    }

    public List<Reservation> findAllReservations() {
        return repository.findAll();
    }

    public List<Reservation> findReservationByStartDateEndDate(UUID roomUuid, LocalDateTime startDate, LocalDateTime endDate) {
        return repository.findByRoomUuidStartDateEndDate(roomUuid, startDate, endDate);
    }


    public Reservation addReservation(Reservation reservation) {
        return repository.save(reservation);
    }

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

    public List<Reservation> findByRoomUuid(UUID roomUuid) {
        return repository.findByRoomUuid(roomUuid);
    }

    public boolean deleteReservation(UUID reservationId) {
        Optional<Reservation> existingReservation = repository.findById(reservationId);
        if (existingReservation.isPresent()) {
            repository.delete(existingReservation.get());
            return true;
        }
        return false;
    }
}
