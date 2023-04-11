package ac.cr.ucr.controller.customResponse;

import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.RoomAvailability;

import java.util.List;

public class RoomAvailabilityResponse {

    private RoomAvailability roomAvailability;

    private List<AvailabilityPeriod> availabilityPeriods;

    public RoomAvailabilityResponse() {
    }

    public RoomAvailabilityResponse(RoomAvailability roomAvailability, List<AvailabilityPeriod> availabilityPeriods) {
        this.roomAvailability = roomAvailability;
        this.availabilityPeriods = availabilityPeriods;
    }

    public RoomAvailability getRoomAvailability() {
        return roomAvailability;
    }

    public void setRoomAvailability(RoomAvailability roomAvailability) {
        this.roomAvailability = roomAvailability;
    }

    public List<AvailabilityPeriod> getAvailabilityPeriods() {
        return availabilityPeriods;
    }

    public void setAvailabilityPeriods(List<AvailabilityPeriod> availabilityPeriods) {
        this.availabilityPeriods = availabilityPeriods;
    }
}
