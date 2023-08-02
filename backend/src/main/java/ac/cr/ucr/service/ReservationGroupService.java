package ac.cr.ucr.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.repository.ReservationGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;

import ac.cr.ucr.model.ReservationGroup;
import org.springframework.stereotype.Service;

@Service
public class ReservationGroupService{

    @Autowired
    private ReservationGroupRepository repository;

    public ReservationGroup findReservationGroup(UUID reservationGroupUuid) {
        Optional<ReservationGroup> reservationGroup = repository.findById(reservationGroupUuid);
        if (reservationGroup.isPresent()) {
            return reservationGroup.get();
        }
        return null;
    }

    public List<ReservationGroup> findAllReservationGroups() {
        return repository.findAll();
    }

    public ReservationGroup addReservationGroup(ReservationGroup reservationGroup) {
        ReservationGroup newReservationGroup = reservationGroup;
        return repository.save(newReservationGroup);
    }

    public ReservationGroup updateReservationGroup(ReservationGroup reservationGroup, UUID uuid) {
        Optional<ReservationGroup> existingReservationGroup = repository.findById(uuid);
        if (existingReservationGroup.isPresent()) {
            return repository.save(reservationGroup);
        }
        return null;
    }

    public boolean deleteReservationGroup(UUID reservationGroupUuid) {
        Optional<ReservationGroup> existingReservationGroup = repository.findById(reservationGroupUuid);
        if (existingReservationGroup.isPresent()) {
            repository.delete(existingReservationGroup.get());
            return true;
        }
        return false;
    }
}
