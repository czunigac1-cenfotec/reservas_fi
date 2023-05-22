package ac.cr.ucr.service;

import ac.cr.ucr.model.Room;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.repository.RoomAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomAvailabilityService {

    @Autowired
    private RoomAvailabilityRepository repository;

    @Autowired
    private RoomService roomService;

    public RoomAvailability findRoomAvailability(UUID roomAvailabilityId) {
        Optional<RoomAvailability> roomAvailability = repository.findById(roomAvailabilityId);
        return roomAvailability.isPresent() ? roomAvailability.get() : null;
    }

    public List<RoomAvailability> findAllRoomAvailability() {
        return repository.findAll();
    }

    public RoomAvailability addRoomAvailability(RoomAvailability roomAvailability) {
        RoomAvailability createdRoomAvalability = repository.save(roomAvailability);
        Room room = roomService.findRoom(createdRoomAvalability.getRoomUuid());
        room.setRoomAvailabilityUuid(createdRoomAvalability.getRoomAvailabilityUuid());
        roomService.updateRoom(room, room.getRoomUuid());
        return createdRoomAvalability;
    }

    public RoomAvailability updateRoomAvailability(RoomAvailability roomAvailability, UUID uuid) {
        Optional<RoomAvailability> existingRoomAvailability = repository.findById(uuid);
        if (existingRoomAvailability.isPresent()) {
            roomAvailability.setRoomAvailabilityUuid(existingRoomAvailability.get().getRoomAvailabilityUuid());
            return repository.save(roomAvailability);
        }
        return null;
    }

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
