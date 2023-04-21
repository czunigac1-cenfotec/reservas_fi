package ac.cr.ucr.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ac.cr.ucr.model.ReservationGroup;
import ac.cr.ucr.repository.functional.ReservationGroupInterface;

@Service("reservationGroup")
public class ReservationGroupRepositoryI implements ReservationGroupInterface {

    @Autowired
    private ReservationGroupRepository repository;

    @Override
    public ReservationGroup findReservationGroup(UUID reservationGroupUuid) {
        Optional<ReservationGroup> reservationGroup = repository.findById(reservationGroupUuid);
        if (reservationGroup.isPresent()) {
            return reservationGroup.get();
        }
        return null;
    }

    @Override
    public List<ReservationGroup> findAllReservationGroups() {
        return repository.findAll();
    }

    @Override
    public ReservationGroup addReservationGroup(ReservationGroup reservationGroup) {
        ReservationGroup newReservationGroup = reservationGroup;
        return repository.save(newReservationGroup);
    }

    @Override
    public ReservationGroup updateReservationGroup(ReservationGroup reservationGroup, UUID uuid) {
        Optional<ReservationGroup> existingReservationGroup = repository.findById(uuid);
        if (existingReservationGroup.isPresent()) {
            return repository.save(reservationGroup);
        }
        return null;
    }

    @Override
    public boolean deleteReservationGroup(UUID reservationGroupUuid) {
        try {
            repository.deleteById(reservationGroupUuid);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
