package ac.cr.ucr.repository.functional;

import java.util.List;
import java.util.UUID;

import ac.cr.ucr.model.Room;

public interface RoomInterface {
    Room findRoom(UUID roomId);

    List<Room> findAllRooms();

    Room addRoom(Room room);

    Room updateRoom(Room room, UUID uuid);

    boolean deleteRoom(UUID roomId);

}
