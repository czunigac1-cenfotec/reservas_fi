package ac.cr.ucr.model;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class AvailabilityPeriod {

    @Id
    private UUID availabilityPeriodUuid;

    @Column(nullable = false)
    private UUID roomAvailabilityUuid;
    @Column(nullable = false)
    private int weekday;

    @Column(nullable = false)
    private int startTimeHour;

    @Column(nullable = false)
    private int startTimeMinutes;

    @Column(nullable = false)
    private int endTimeHour;

    @Column(nullable = false)
    private int endTimeMinutes;

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    public AvailabilityPeriod() {
        this.availabilityPeriodUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public AvailabilityPeriod(UUID roomAvailabilityUuid, int weekday, int startTimeHour, int startTimeMinutes, int endTimeHour, int endTimeMinutes) {
        this();
        this.roomAvailabilityUuid = roomAvailabilityUuid;
        this.weekday = weekday;
        this.startTimeHour = startTimeHour;
        this.startTimeMinutes = startTimeMinutes;
        this.endTimeHour = endTimeHour;
        this.endTimeMinutes = endTimeMinutes;
    }

    public UUID getRoomAvailabilityUuid() {
        return roomAvailabilityUuid;
    }

    public void setRoomAvailabilityUuid(UUID roomAvailabilityUuid) {
        this.roomAvailabilityUuid = roomAvailabilityUuid;
    }

    public UUID getAvailabilityPeriodUuid() {
        return availabilityPeriodUuid;
    }

    public void setAvailabilityPeriodUuid(UUID availabilityPeriodUuid) {
        this.availabilityPeriodUuid = availabilityPeriodUuid;
    }

    public int getWeekday() {
        return weekday;
    }

    public void setWeekday(int weekday) {
        this.weekday = weekday;
    }

    public int getStartTimeHour() {
        return startTimeHour;
    }

    public void setStartTimeHour(int startTimeHour) {
        this.startTimeHour = startTimeHour;
    }

    public int getStartTimeMinutes() {
        return startTimeMinutes;
    }

    public void setStartTimeMinutes(int startTimeMinutes) {
        this.startTimeMinutes = startTimeMinutes;
    }

    public int getEndTimeHour() {
        return endTimeHour;
    }

    public void setEndTimeHour(int endTimeHour) {
        this.endTimeHour = endTimeHour;
    }

    public int getEndTimeMinutes() {
        return endTimeMinutes;
    }

    public void setEndTimeMinutes(int endTimeMinutes) {
        this.endTimeMinutes = endTimeMinutes;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    @Override
    public String toString() {
        return "{" +
                "\"availabilityPeriodUuid\":\"" + availabilityPeriodUuid + "\"," +
                "\"weekday\":\"" + weekday + "\"," +
                "\"startTimeHour\":\"" + startTimeHour + "\"," +
                "\"startTimeMinutes\":\"" + startTimeMinutes + "\"," +
                "\"endTimeHour\":\"" + endTimeHour + "\"," +
                "\"endTimeMinutes\":\"" + endTimeMinutes + "\"," +
                "\"creationDateTime\":\"" + creationDateTime + "\"" +
                "}";
    }
}
