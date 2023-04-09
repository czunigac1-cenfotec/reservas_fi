package ac.cr.ucr.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.model.Room;

public interface RoomService {
    Room findRoom(UUID roomId);

    List<Room> findAllRooms();

    Room addRoom(Room room);

    Room updateRoom(Room room, UUID uuid);

    boolean deleteRoom(UUID roomId);

}
