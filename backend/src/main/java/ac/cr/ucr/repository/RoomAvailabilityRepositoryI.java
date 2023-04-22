package ac.cr.ucr.repository;

import ac.cr.ucr.model.Room;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.repository.functional.RoomInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.repository.functional.RoomAvailabilityInterface;

@Repository
public class RoomAvailabilityRepositoryI implements RoomAvailabilityInterface {

    @Autowired
    private RoomAvailabilityRepository repository;

    @Autowired
    private RoomInterface roomInterface;

    @Override
    public RoomAvailability findRoomAvailability(UUID roomAvailabilityId) {
        Optional<RoomAvailability> roomAvailability = repository.findById(roomAvailabilityId);
        return roomAvailability.isPresent() ? roomAvailability.get() : null;
    }

    @Override
    public List<RoomAvailability> findAllRoomAvailability() {
        return repository.findAll();
    }

    @Override
    public RoomAvailability addRoomAvailability(RoomAvailability roomAvailability) {
        RoomAvailability createdRoomAvalability = repository.save(roomAvailability);
        Room room = roomInterface.findRoom(createdRoomAvalability.getRoomUuid());
        room.setRoomAvailabilityUuid(createdRoomAvalability.getRoomAvailabilityUuid());
        roomInterface.updateRoom(room, room.getRoomUuid());
        return createdRoomAvalability;
    }

    @Override
    public RoomAvailability updateRoomAvailability(RoomAvailability roomAvailability, UUID uuid) {
        Optional<RoomAvailability> existingRoomAvailability = repository.findById(uuid);
        if (existingRoomAvailability.isPresent()) {
            roomAvailability.setRoomAvailabilityUuid(existingRoomAvailability.get().getRoomAvailabilityUuid());
            return repository.save(roomAvailability);
        }
        return null;
    }

    @Override
    public boolean deleteRoomAvailability(UUID roomAvailabilityId) {
        Optional<RoomAvailability> existingRoomAvailability = repository.findById(roomAvailabilityId);
        if (existingRoomAvailability.isPresent()) {
            repository.delete(existingRoomAvailability.get());
            return true;
        }
        return false;
    }

    public RoomAvailability findRoomAvailabilityByRoomUuid(UUID roomUuid) {
        Optional<RoomAvailability> roomAvailability = repository.findByRoomUuid(roomUuid);
        return roomAvailability.orElse(null);
    }

    public List<RoomAvailability> findRoomAvailabilityInPeriod(LocalDateTime startDate, LocalDateTime endDate){
        return repository.findRoomAvailabilityInPeriod(startDate, endDate);
    }
}
