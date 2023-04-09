package ac.cr.ucr.service;

import ac.cr.ucr.model.AvailabilityPeriod;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface AvailabilityPeriodService {

    AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodId);

    List<AvailabilityPeriod> findAllAvailabilityPeriods();

    AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod);

    AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID availabilityPeriodId);

    boolean deleteAvailabilityPeriod(UUID availabilityPeriodId);

}
