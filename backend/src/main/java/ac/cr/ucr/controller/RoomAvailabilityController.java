package ac.cr.ucr.controller;

import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.logic.service.RoomAvailabilityService;
import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.repository.RoomAvailabilityRepository;
import ac.cr.ucr.repository.functional.AvailabilityPeriodInterface;
import ac.cr.ucr.repository.functional.RoomAvailabilityInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequestMapping("/roomAvailability")
@CrossOrigin
@RestController
public class RoomAvailabilityController {

    @Autowired
    private RoomAvailabilityInterface roomAvailabilityInterface;

    @Autowired
    private AvailabilityPeriodInterface availabilityPeriodInterface;

    @Autowired
    private RoomAvailabilityService roomAvailabilityService;

    @GetMapping
    public List<RoomAvailability> getAllRoomAvailability() {
        return this.roomAvailabilityInterface.findAllRoomAvailability();
    }

    @GetMapping("/{uuid}")
    public RoomAvailability getRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityInterface.findRoomAvailability(roomAvailabilityId);
    }

    @GetMapping("/room-uuid/{roomUuid}")
    public ResponseEntity<RoomAvailabilityResponse>  getRoomAvailabilityByRoomUuid(@PathVariable("roomUuid") UUID roomUuid) {
        RoomAvailability roomAvailability = roomAvailabilityInterface.findRoomAvailabilityByRoomUuid(roomUuid);
        List<AvailabilityPeriod> availabilityPeriods = new ArrayList<AvailabilityPeriod>();
        for (UUID availabilityPeriodUuid:
             roomAvailability.getAvailabilityPeriods()) {
            availabilityPeriods.add(availabilityPeriodInterface.findAvailabilityPeriod(availabilityPeriodUuid));
        }
        RoomAvailabilityResponse response = new RoomAvailabilityResponse(
                roomAvailability,
                availabilityPeriods
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoomAvailabilityResponse> addRoomAvailability(@RequestBody String scheduledRoomAvailabilityJson) {
        RoomAvailabilityResponse response = roomAvailabilityService.createRoomAvailabilityWithAvailabilityPeriods(scheduledRoomAvailabilityJson);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PutMapping("/{uuid}")
    public RoomAvailability updateRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId, @RequestBody RoomAvailability roomAvailability) {
        return this.roomAvailabilityInterface.updateRoomAvailability(roomAvailability, roomAvailabilityId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityInterface.deleteRoomAvailability(roomAvailabilityId);
    }

}
