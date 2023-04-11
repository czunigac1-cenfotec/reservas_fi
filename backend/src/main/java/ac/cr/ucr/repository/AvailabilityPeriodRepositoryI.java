package ac.cr.ucr.repository;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.model.ReservationGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.service.AvailabilityPeriodService;

@Repository
public class AvailabilityPeriodRepositoryI implements AvailabilityPeriodService {

    @Autowired
    private AvailabilityPeriodRepository repository;

    @Override
    public AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodUuid) {
        Optional<AvailabilityPeriod> availabilityPeriod = repository.findById(availabilityPeriodUuid);
        if (availabilityPeriod.isPresent()) {
            return availabilityPeriod.get();
        }
        return null;
    }

    @Override
    public List<AvailabilityPeriod> findAllAvailabilityPeriods() {
        return repository.findAll();
    }


    @Override
    public AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod) {
        AvailabilityPeriod newAvailabilityPeriod = availabilityPeriod;
        return repository.save(newAvailabilityPeriod);
    }

    @Override
    public AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID uuid) {
        Optional<AvailabilityPeriod> existingAvailabilityPeriod = repository.findById(uuid);
        if (existingAvailabilityPeriod.isPresent()) {
            return repository.save(availabilityPeriod);
        }
        return null;
    }

    @Override
    public boolean deleteAvailabilityPeriod(UUID availabilityPeriodId) {
        return false;
    }
}
