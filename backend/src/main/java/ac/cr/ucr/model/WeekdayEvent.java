package ac.cr.ucr.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class WeekdayEvent {

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private String motive;

    private boolean approvalState;

    private String notes;


    private UUID roomUuid;

    public WeekdayEvent() {
    }

    public WeekdayEvent(LocalDateTime startDateTime, LocalDateTime endDateTime, String motive, boolean approvalState, String notes, UUID roomUuid) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.motive = motive;
        this.approvalState = approvalState;
        this.notes = notes;
        this.roomUuid = roomUuid;
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

    public String getMotive() {
        return motive;
    }

    public void setMotive(String motive) {
        this.motive = motive;
    }

    public boolean isApprovalState() {
        return approvalState;
    }

    public void setApprovalState(boolean approvalState) {
        this.approvalState = approvalState;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public UUID getRoomUuid() {
        return roomUuid;
    }

    public void setRoomUuid(UUID roomUuid) {
        this.roomUuid = roomUuid;
    }

}
