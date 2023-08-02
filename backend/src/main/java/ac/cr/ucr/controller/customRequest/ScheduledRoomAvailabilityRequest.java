package ac.cr.ucr.controller.customRequest;

import java.util.List;
import java.time.LocalDateTime;
import java.util.UUID;

public class ScheduledRoomAvailabilityRequest {
    private int minReservationTime;

    private int maxReservationTime;

    private boolean approvalRequired;

    private boolean privateReservationEnabled;

    private UUID administratorUuid;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    private List<ScheduledAvailabilityPeriod> availabilityPeriods;

    private UUID roomUuid;

    public ScheduledRoomAvailabilityRequest() {
    }

    public ScheduledRoomAvailabilityRequest(int minReservationTime, int maxReservationTime, boolean approvalRequired, boolean privateReservationEnabled, UUID administratorUuid, LocalDateTime startDateTime, LocalDateTime endDateTime, List<ScheduledAvailabilityPeriod> availabilityPeriods, UUID roomUuid) {
        this.minReservationTime = minReservationTime;
        this.maxReservationTime = maxReservationTime;
        this.approvalRequired = approvalRequired;
        this.privateReservationEnabled = privateReservationEnabled;
        this.administratorUuid = administratorUuid;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.availabilityPeriods = availabilityPeriods;
        this.roomUuid = roomUuid;
    }

    public UUID getRoomUuid() {
        return roomUuid;
    }

    public void setRoomUuid(UUID roomUuid) {
        this.roomUuid = roomUuid;
    }

    public int getMinReservationTime() {
        return minReservationTime;
    }

    public void setMinReservationTime(int minReservationTime) {
        this.minReservationTime = minReservationTime;
    }

    public int getMaxReservationTime() {
        return maxReservationTime;
    }

    public void setMaxReservationTime(int maxReservationTime) {
        this.maxReservationTime = maxReservationTime;
    }

    public boolean isApprovalRequired() {
        return approvalRequired;
    }

    public void setApprovalRequired(boolean approvalRequired) {
        this.approvalRequired = approvalRequired;
    }

    public boolean isPrivateReservationEnabled() {
        return privateReservationEnabled;
    }

    public void setPrivateReservationEnabled(boolean privateReservationEnabled) {
        this.privateReservationEnabled = privateReservationEnabled;
    }

    public UUID getAdministratorUuid() {
        return administratorUuid;
    }

    public void setAdministratorUuid(UUID administratorUuid) {
        this.administratorUuid = administratorUuid;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public List<ScheduledAvailabilityPeriod> getAvailabilityPeriods() {
        return availabilityPeriods;
    }

    public void setAvailabilityPeriods(List<ScheduledAvailabilityPeriod> availabilityPeriods) {
        this.availabilityPeriods = availabilityPeriods;
    }

}
