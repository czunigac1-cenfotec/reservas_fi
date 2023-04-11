package ac.cr.ucr.controller;

import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.logic.controllerBroker.RoomAvailabilityBroker;
import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.model.ScheduledRoomAvailability;
import ac.cr.ucr.service.AvailabilityPeriodService;
import ac.cr.ucr.service.RoomAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequestMapping("/roomAvailability")
@CrossOrigin
@RestController
public class RoomAvailabilityController {

    @Autowired
    private RoomAvailabilityService roomAvailabilityService;

    @Autowired
    private AvailabilityPeriodService availabilityPeriodService;

    @Autowired
    private RoomAvailabilityBroker roomAvailabilityBroker;

    @GetMapping
    public List<RoomAvailability> getAllRoomAvailability() {
        return this.roomAvailabilityService.findAllRoomAvailability();
    }

    @GetMapping("/{uuid}")
    public RoomAvailability getRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityService.findRoomAvailability(roomAvailabilityId);
    }

    @PostMapping
    public ResponseEntity<RoomAvailabilityResponse> addRoomAvailability(@RequestBody String scheduledRoomAvailabilityJson) {
        RoomAvailabilityResponse response = roomAvailabilityBroker.createRoomAvailabilityWithAvailabilityPeriods(scheduledRoomAvailabilityJson);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PutMapping("/{uuid}")
    public RoomAvailability updateRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId, @RequestBody RoomAvailability roomAvailability) {
        return this.roomAvailabilityService.updateRoomAvailability(roomAvailability, roomAvailabilityId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityService.deleteRoomAvailability(roomAvailabilityId);
    }

}
