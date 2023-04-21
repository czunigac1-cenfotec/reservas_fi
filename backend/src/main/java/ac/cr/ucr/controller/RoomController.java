package ac.cr.ucr.controller;

import ac.cr.ucr.model.Room;
import ac.cr.ucr.repository.functional.RoomInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/room")
@CrossOrigin
@RestController
public class RoomController {

    @Autowired
    private RoomInterface roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return this.roomService.findAllRooms();
    }

    @GetMapping("/{uuid}")
    public Room getRoom(@PathVariable("uuid") UUID roomId) {
        return this.roomService.findRoom(roomId);
    }

    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return this.roomService.addRoom(room);
    }

    @PutMapping("/{uuid}")
    public Room updateRoom(@PathVariable("uuid") UUID roomId, @RequestBody Room room) {
        return this.roomService.updateRoom(room, roomId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteRoom(@PathVariable("uuid") UUID roomId) {
        return this.roomService.deleteRoom(roomId);
    }

}
