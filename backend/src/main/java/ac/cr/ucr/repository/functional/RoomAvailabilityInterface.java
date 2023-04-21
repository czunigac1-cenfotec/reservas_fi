package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.RoomAvailability;

import java.util.List;
import java.util.UUID;

public interface RoomAvailabilityInterface {

    RoomAvailability findRoomAvailability(UUID roomAvailabilityId);

    List<RoomAvailability> findAllRoomAvailability();

    RoomAvailability addRoomAvailability(RoomAvailability roomAvailability);

    RoomAvailability updateRoomAvailability (RoomAvailability roomAvailability, UUID uuid);

    RoomAvailability findRoomAvailabilityByRoomUuid(UUID roomUuid);

    boolean deleteRoomAvailability(UUID roomAvailabilityId);
}
