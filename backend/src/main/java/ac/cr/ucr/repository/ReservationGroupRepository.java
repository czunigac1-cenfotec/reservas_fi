package ac.cr.ucr.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.ReservationGroup;

@Repository
public interface ReservationGroupRepository extends JpaRepository<ReservationGroup, UUID> {

}
