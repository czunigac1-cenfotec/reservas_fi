package ac.cr.ucr.repository;

import ac.cr.ucr.model.RoomAvailability;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import ac.cr.ucr.service.RoomAvailabilityService;

@Repository
public class RoomAvailabilityRepositoryI implements RoomAvailabilityService {

    private List<RoomAvailability> roomAvailabilityList = new ArrayList<>();

    @Override
    public RoomAvailability findRoomAvailability(UUID roomAvailabilityId) {
        for (RoomAvailability roomAvailability : roomAvailabilityList) {
            if (roomAvailability.getRoomAvailabilityUuid().equals(roomAvailabilityId)) {
                return roomAvailability;
            }
        }
        return null;
    }

    @Override
    public List<RoomAvailability> findAllRoomAvailability() {
        return roomAvailabilityList;
    }

    @Override
    public RoomAvailability addRoomAvailability(RoomAvailability roomAvailability) {
        roomAvailabilityList.add(roomAvailability);
        return roomAvailability;
    }

    @Override
    public RoomAvailability updateRoomAvailabilityRoom(RoomAvailability roomAvailability, UUID uuid) {
        for (int i = 0; i < roomAvailabilityList.size(); i++) {
            if (roomAvailabilityList.get(i).getRoomAvailabilityUuid().equals(uuid)) {
                roomAvailabilityList.set(i, roomAvailability);
                return roomAvailability;
            }
        }
        return null;
    }

    @Override
    public boolean deleteRoomAvailability(UUID roomAvailabilityId) {
        for (RoomAvailability roomAvailability : roomAvailabilityList) {
            if (roomAvailability.getRoomAvailabilityUuid().equals(roomAvailabilityId)) {
                roomAvailabilityList.remove(roomAvailability);
                return true;
            }
        }
        return false;
    }
}
