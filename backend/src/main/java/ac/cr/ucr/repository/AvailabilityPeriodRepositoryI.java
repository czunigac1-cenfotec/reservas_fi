package ac.cr.ucr.repository;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.service.AvailabilityPeriodService;

@Repository
public class AvailabilityPeriodRepositoryI implements AvailabilityPeriodService {

    private List<AvailabilityPeriod> availabilityPeriodList = new ArrayList<>();

    @Override
    public AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodId) {
        for (AvailabilityPeriod availabilityPeriod : availabilityPeriodList) {
            if (availabilityPeriod.getAvailabilityPeriodUuid().equals(availabilityPeriodId)) {
                return availabilityPeriod;
            }
        }
        return null;
    }

    @Override
    public List<AvailabilityPeriod> findAllAvailabilityPeriods() {
        return availabilityPeriodList;
    }


    @Override
    public AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod) {
        availabilityPeriodList.add(availabilityPeriod);
        return availabilityPeriod;
    }

    @Override
    public AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID uuid) {
        for (int i = 0; i < availabilityPeriodList.size(); i++) {
            if (availabilityPeriodList.get(i).getAvailabilityPeriodUuid().equals(uuid)) {
                availabilityPeriodList.set(i, availabilityPeriod);
                return availabilityPeriod;
            }
        }
        return null;
    }

    @Override
    public boolean deleteAvailabilityPeriod(UUID availabilityPeriodId) {
        for (AvailabilityPeriod availabilityPeriod : availabilityPeriodList) {
            if (availabilityPeriod.getAvailabilityPeriodUuid().equals(availabilityPeriodId)) {
                availabilityPeriodList.remove(availabilityPeriod);
                return true;
            }
        }
        return false;
    }
}
