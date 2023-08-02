package ac.cr.ucr.controller;

import ac.cr.ucr.controller.customRequest.ScheduledRoomAvailabilityRequest;
import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.logic.service.RoomAvailabilityLogicService;
import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.service.AvailabilityPeriodService;
import ac.cr.ucr.service.RoomAvailabilityService;
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
    private RoomAvailabilityService roomAvailabilityService;

    @Autowired
    private AvailabilityPeriodService availabilityPeriodService;

    @Autowired
    private RoomAvailabilityLogicService roomAvailabilityLogicService;

    @GetMapping
    public List<RoomAvailability> getAllRoomAvailability() {
        return this.roomAvailabilityService.findAllRoomAvailability();
    }

    @GetMapping("/{uuid}")
    public RoomAvailability getRoomAvailability(@PathVariable("uuid") UUID roomAvailabilityId) {
        return this.roomAvailabilityService.findRoomAvailability(roomAvailabilityId);
    }

    @GetMapping("/room-uuid/{roomUuid}")
    public ResponseEntity<RoomAvailabilityResponse>  getRoomAvailabilityByRoomUuid(@PathVariable("roomUuid") UUID roomUuid) {
        RoomAvailability roomAvailability = roomAvailabilityService.findRoomAvailabilityByRoomUuid(roomUuid);
        List<AvailabilityPeriod> availabilityPeriods = new ArrayList<AvailabilityPeriod>();
        for (UUID availabilityPeriodUuid:
             roomAvailability.getAvailabilityPeriods()) {
            availabilityPeriods.add(availabilityPeriodService.findAvailabilityPeriod(availabilityPeriodUuid));
        }
        RoomAvailabilityResponse response = new RoomAvailabilityResponse(
                roomAvailability,
                availabilityPeriods
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoomAvailabilityResponse> addRoomAvailability(@RequestBody ScheduledRoomAvailabilityRequest scheduledRoomAvailability) {
        RoomAvailabilityResponse response = roomAvailabilityLogicService.createRoomAvailabilityWithAvailabilityPeriods(scheduledRoomAvailability);
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
