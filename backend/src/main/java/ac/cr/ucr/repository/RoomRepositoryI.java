package ac.cr.ucr.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.Room;
import ac.cr.ucr.service.RoomService;

@Service("room")
public class RoomRepositoryI implements RoomService {

    @Autowired
    private RoomRepository repository;

    @Override
    public Room findRoom(UUID roomId) {
        Optional<Room> room = repository.findById(roomId);
        return room.orElse(null);
    }

    @Override
    public List<Room> findAllRooms() {
        return repository.findAll();
    }

    @Override
    public Room addRoom(Room room) {
        return repository.save(room);
    }

    @Override
    public Room updateRoom(Room room, UUID roomId) {
        Optional<Room> existingRoom = repository.findById(roomId);
        if (existingRoom.isPresent()) {
            room.setRoomUuid(existingRoom.get().getRoomUuid());
            return repository.save(room);
        }
        return null;
    }

    @Override
    public boolean deleteRoom(UUID roomId) {
        Optional<Room> existingRoom = repository.findById(roomId);
        if (existingRoom.isPresent()) {
            repository.delete(existingRoom.get());
            return true;
        }
        return false;
    }
}
