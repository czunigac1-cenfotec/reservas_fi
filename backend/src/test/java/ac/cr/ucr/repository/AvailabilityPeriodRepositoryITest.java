//package ac.cr.ucr.repository;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import ac.cr.ucr.model.AvailabilityPeriod;
//import ac.cr.ucr.repository.functional.AvailabilityPeriodInterface;
//
//@Repository
//public class AvailabilityPeriodRepository implements AvailabilityPeriodInterface {
//
//    @Autowired
//    private ac.cr.ucr.repository.AvailabilityPeriodRepository jpaRepository;
//
//    @Override
//    public AvailabilityPeriod findAvailabilityPeriod(UUID availabilityPeriodUuid) {
//        Optional<AvailabilityPeriod> availabilityPeriod = jpaRepository.findById(availabilityPeriodUuid);
//        return availabilityPeriod.orElse(null);
//    }
//
//    @Override
//    public List<AvailabilityPeriod> findAllAvailabilityPeriods() {
//        return jpaRepository.findAll();
//    }
//
//    @Override
//    public AvailabilityPeriod addAvailabilityPeriod(AvailabilityPeriod availabilityPeriod) {
//        return jpaRepository.save(availabilityPeriod);
//    }
//
//    @Override
//    public AvailabilityPeriod updateAvailabilityPeriod(AvailabilityPeriod availabilityPeriod, UUID uuid) {
//        Optional<AvailabilityPeriod> existingAvailabilityPeriod = jpaRepository.findById(uuid);
//        if (existingAvailabilityPeriod.isPresent()) {
//            AvailabilityPeriod existing = existingAvailabilityPeriod.get();
//            existing.setRoomAvailabilityUuid(availabilityPeriod.getRoomAvailabilityUuid());
//            existing.setWeekday(availabilityPeriod.getWeekday());
//            existing.setStartTimeHour(availabilityPeriod.getStartTimeHour());
//            existing.setStartTimeMinutes(availabilityPeriod.getStartTimeMinutes());
//            existing.setEndTimeHour(availabilityPeriod.getEndTimeHour());
//            existing.setEndTimeMinutes(availabilityPeriod.getEndTimeMinutes());
//            return jpaRepository.save(existing);
//        }
//        return null;
//    }
//
//    @Override
//    public boolean deleteAvailabilityPeriod(UUID availabilityPeriodId) {
//        if (jpaRepository.existsById(availabilityPeriodId)) {
//            jpaRepository.deleteById(availabilityPeriodId);
//            return true;
//        }
//        return false;
//    }
//}
