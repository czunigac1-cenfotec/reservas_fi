package ac.cr.ucr.controller;

import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.service.RoomAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/roomAvailability")
@CrossOrigin
@RestController
public class RoomAvailabilityController {

    @Autowired
    private RoomAvailabilityService roomAvailabilityService;

    @GetMapping
    public List<RoomAvailability> getAllRoomAvailability() {
        return this.roomAvailabilityService.findAllRoomAvailability();
    }

    @GetMapping("/{uuid}")
    public RoomAvailability getRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityService.findRoomAvailability(roomAvailabilityId);
    }

    @PostMapping
    public RoomAvailability addRoomAvailability(@RequestBody RoomAvailability roomAvailability) {
        return this.roomAvailabilityService.addRoomAvailability(roomAvailability);
    }

    @PutMapping("/{uuid}")
    public RoomAvailability updateRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId, @RequestBody RoomAvailability roomAvailability) {
        return this.roomAvailabilityService.updateRoomAvailabilityRoom(roomAvailability, roomAvailabilityId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityService.deleteRoomAvailability(roomAvailabilityId);
    }

}
