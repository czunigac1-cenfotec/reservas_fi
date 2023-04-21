package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.AvailabilityPeriod;

import java.util.List;
import java.util.UUID;

public interface AvailabilityPeriodInterface {

    AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodId);

    List<AvailabilityPeriod> findAllAvailabilityPeriods();

    AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod);

    AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID availabilityPeriodId);

    boolean deleteAvailabilityPeriod(UUID availabilityPeriodId);

}
