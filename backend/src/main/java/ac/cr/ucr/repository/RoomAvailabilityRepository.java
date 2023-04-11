package ac.cr.ucr.repository;

import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.RoomAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.Room;


@Repository("roomAvailabilityRepository")
public interface RoomAvailabilityRepository extends JpaRepository<RoomAvailability, UUID> {
    @Query("SELECT ra FROM RoomAvailability ra WHERE ra.roomUuid = ?1 order by creationDateTime desc limit 1")
    Optional<RoomAvailability> findByRoomUuid(UUID roomUuid);

}
