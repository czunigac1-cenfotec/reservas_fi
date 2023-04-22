package ac.cr.ucr.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.Room;


@Repository("roomRepository")
public interface RoomRepository extends JpaRepository<Room, UUID> {

    @Query("SELECT r from Room r where inactive = false")
    List<Room> findAllAvailableRooms();

}
