package ac.cr.ucr.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RoomAvailability {

    @Id
    private UUID roomAvailabilityUuid;

    @Column(nullable = false)
    private int minReservationTime;

    @Column(nullable = false)
    private int maxReservationTime;

    @Column(nullable = false)
    private boolean approvalRequired;

    @Column(nullable = false)
    private UUID administratorUuid;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    @Column(nullable = false)
    private boolean privateReservationEnabled;

    @ElementCollection
    private List<UUID> availabilityPeriods;

    public RoomAvailability() {
        this.roomAvailabilityUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public RoomAvailability(int minReservationTime, int maxReservationTime, boolean approvalRequired,
                            UUID administratorUuid, LocalDateTime startDateTime, LocalDateTime endDateTime,
                            boolean privateReservationEnabled,
                            List<UUID> availabilityPeriods) {
        this();
        this.minReservationTime = minReservationTime;
        this.maxReservationTime = maxReservationTime;
        this.approvalRequired = approvalRequired;
        this.administratorUuid = administratorUuid;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.privateReservationEnabled = privateReservationEnabled;
        this.availabilityPeriods = availabilityPeriods;
        this.creationDateTime = LocalDateTime.now();
    }

    public UUID getRoomAvailabilityUuid() {
        return roomAvailabilityUuid;
    }

    public void setRoomAvailabilityUuid(UUID roomAvailabilityUuid) {
        this.roomAvailabilityUuid = roomAvailabilityUuid;
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

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public boolean isPrivateReservationEnabled() {
        return privateReservationEnabled;
    }

    public void setPrivateReservationEnabled(boolean privateReservationEnabled) {
        this.privateReservationEnabled = privateReservationEnabled;
    }


    public List<UUID> getAvailabilityPeriods() {
        return availabilityPeriods;
    }

    public void setAvailabilityPeriods(List<UUID> availabilityPeriods) {
        this.availabilityPeriods = availabilityPeriods;
    }

    @Override
    public String toString() {
        return "{" +
                "\"roomAvailabilityUuid\":\"" + roomAvailabilityUuid + "\"," +
                "\"minReservationTime\":\"" + minReservationTime + "\"," +
                "\"maxReservationTime\":\"" + maxReservationTime + "\"," +
                "\"approvalRequired\":\"" + approvalRequired + "\"," +
                "\"administratorUuid\":\"" + administratorUuid + "\"," +
                "\"startDateTime\":\"" + startDateTime + "\"," +
                "\"endDateTime\":\"" + endDateTime + "\"," +
                "\"creationDateTime\":\"" + creationDateTime + "\"," +
                "\"privateReservationEnabled\":\"" + privateReservationEnabled + "\"" +
                "}";
    }

}
