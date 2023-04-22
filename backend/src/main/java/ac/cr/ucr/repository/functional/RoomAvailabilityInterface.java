package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.RoomAvailability;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface RoomAvailabilityInterface {

    RoomAvailability findRoomAvailability(UUID roomAvailabilityId);

    List<RoomAvailability> findAllRoomAvailability();

    RoomAvailability addRoomAvailability(RoomAvailability roomAvailability);

    RoomAvailability updateRoomAvailability (RoomAvailability roomAvailability, UUID uuid);

    RoomAvailability findRoomAvailabilityByRoomUuid(UUID roomUuid);

    List<RoomAvailability> findRoomAvailabilityInPeriod(LocalDateTime startDate, LocalDateTime endDate);

    boolean deleteRoomAvailability(UUID roomAvailabilityId);
}
