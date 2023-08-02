package ac.cr.ucr.service;

import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.repository.AvailabilityPeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import ac.cr.ucr.model.AvailabilityPeriod;
import org.springframework.stereotype.Service;

@Service
public class AvailabilityPeriodService {

    @Autowired
    private AvailabilityPeriodRepository repository;

    public AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodUuid) {
        Optional<AvailabilityPeriod> availabilityPeriod = repository.findById(availabilityPeriodUuid);
        if (availabilityPeriod.isPresent()) {
            return availabilityPeriod.get();
        }
        return null;
    }

    public List<AvailabilityPeriod> findAllAvailabilityPeriods() {
        return repository.findAll();
    }


    public AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod) {
        AvailabilityPeriod newAvailabilityPeriod = availabilityPeriod;
        return repository.save(newAvailabilityPeriod);
    }

    public AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID uuid) {
        Optional<AvailabilityPeriod> existingAvailabilityPeriod = repository.findById(uuid);
        if (existingAvailabilityPeriod.isPresent()) {
            return repository.save(availabilityPeriod);
        }
        return null;
    }
    public boolean deleteAvailabilityPeriod(UUID availabilityPeriodId) {
        Optional<AvailabilityPeriod> existingAvailabilityPeriod = repository.findById(availabilityPeriodId);
        if (existingAvailabilityPeriod.isPresent()) {
            repository.delete(existingAvailabilityPeriod.get());
            return true;
        }
        return false;
    }
}
