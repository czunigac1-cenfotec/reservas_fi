package ac.cr.ucr.repository;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CustomAttributeRepository extends JpaRepository<CustomAttribute, UUID> {
    @Query("SELECT r FROM CustomAttribute r WHERE r.roomAvailabilityUuid = ?1")
    List<CustomAttribute> findByRoomAvailabilityUuid(UUID roomAvailabilityUuid);
}
