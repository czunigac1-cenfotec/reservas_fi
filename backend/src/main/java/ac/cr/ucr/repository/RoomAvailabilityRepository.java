package ac.cr.ucr.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.RoomAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomAvailabilityRepository extends JpaRepository<RoomAvailability, UUID> {
    @Query("SELECT ra FROM RoomAvailability ra WHERE ra.roomUuid = ?1 order by creationDateTime desc limit 1")
    Optional<RoomAvailability> findByRoomUuid(UUID roomUuid);

    @Query("SELECT ra FROM RoomAvailability ra WHERE ra.startDateTime >= ?1 and ra.endDateTime >= ?2")
    List<RoomAvailability> findRoomAvailabilityInPeriod(LocalDateTime startDate, LocalDateTime endDate);

}
