package ac.cr.ucr.repository;

import java.util.UUID;

import ac.cr.ucr.model.AvailabilityPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.Reservation;

@Repository
public interface AvailabilityPeriodRepository extends JpaRepository<AvailabilityPeriod, UUID> {

}

