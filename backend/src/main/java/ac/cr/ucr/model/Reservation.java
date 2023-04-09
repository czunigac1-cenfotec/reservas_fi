package ac.cr.ucr.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;

@Entity
public class Reservation {

    @Id
    private UUID reservationUuid;

    private UUID reservationGroupUuid;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    private String motive;

    @Column(columnDefinition = "boolean default false")
    private boolean approvalState;

    private String notes;

    @Column(nullable = false)
    private UUID userUuid;

    @Column(nullable = false)
    private UUID roomUuid;

    @ElementCollection
    private Set<UUID> resourceUuids = new HashSet<>();

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    public Reservation() {
        this.reservationUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public Reservation(UUID reservationGroupUuid, LocalDateTime startDateTime, LocalDateTime endDateTime, UUID userUuid, UUID roomUuid) {
        this();
        this.reservationGroupUuid = reservationGroupUuid;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.approvalState = false;
        this.userUuid = userUuid;
        this.roomUuid = roomUuid;
    }

    public UUID getReservationUuid() {
        return reservationUuid;
    }

    public void setReservationUuid(UUID reservationUuid) {
        this.reservationUuid = reservationUuid;
    }

    public UUID getReservationGroupUuid() {
        return reservationGroupUuid;
    }

    public void setReservationGroupUuid(UUID reservationGroupUuid) {
        this.reservationGroupUuid = reservationGroupUuid;
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

    public UUID getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(UUID userUuid) {
        this.userUuid = userUuid;
    }

    public UUID getRoomUuid() {
        return roomUuid;
    }

    public void setRoomUuid(UUID roomUuid) {
        this.roomUuid = roomUuid;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "reservation_resource",
            joinColumns = @JoinColumn(name = "reservationUuid"),
            inverseJoinColumns = @JoinColumn(name = "resourceUuid"))

    public Set<UUID> getResourceUuids() {
        return resourceUuids;
    }

    public void setResourceUuids(Set<UUID> resourceUuids) {
        this.resourceUuids = resourceUuids;
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
                "\"reservationUuid\":\"" + reservationUuid + "\"," +
                "\"roomUuid\":\"" + roomUuid + "\"," +
                "\"reservationGroupUuid\":\"" + reservationGroupUuid + "\"," +
                "\"startDateTime\":\"" + startDateTime + "\"," +
                "\"endDateTime\":\"" + endDateTime + "\"," +
                "\"motive\":\"" + motive + "\"," +
                "\"approvalState\":\"" + approvalState + "\"," +
                "\"notes\":\"" + notes + "\"," +
                "\"userUuid\":\"" + userUuid + "\"," +
                "\"creationDateTime\":\"" + creationDateTime + "\"" +
                "}";
    }

}
