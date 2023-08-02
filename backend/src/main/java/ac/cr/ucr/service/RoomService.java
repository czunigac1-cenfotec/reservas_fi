package ac.cr.ucr.service;

import ac.cr.ucr.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.Room;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    public Room findRoom(UUID roomId) {
        Optional<Room> room = repository.findById(roomId);
        return room.orElse(null);
    }

    public List<Room> findAllRooms() {
        return repository.findAll();
    }

    public Room addRoom(Room room) {
        return repository.save(room);
    }

    public Room updateRoom(Room room, UUID roomId) {
        Optional<Room> existingRoom = repository.findById(roomId);
        if (existingRoom.isPresent()) {
            room.setRoomUuid(existingRoom.get().getRoomUuid());
            return repository.save(room);
        }
        return null;
    }

    public boolean deleteRoom(UUID roomId) {
        Optional<Room> existingRoom = repository.findById(roomId);
        if (existingRoom.isPresent()) {
            repository.delete(existingRoom.get());
            return true;
        }
        return false;
    }
}
