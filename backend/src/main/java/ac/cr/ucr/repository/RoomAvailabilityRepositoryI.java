package ac.cr.ucr.repository;

import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.model.Room;
import ac.cr.ucr.model.RoomAvailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.service.RoomAvailabilityService;

@Repository
public class RoomAvailabilityRepositoryI implements RoomAvailabilityService {

    @Autowired
    private RoomAvailabilityRepository repository;

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
        repository.save(roomAvailability);
        return roomAvailability;
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
}
