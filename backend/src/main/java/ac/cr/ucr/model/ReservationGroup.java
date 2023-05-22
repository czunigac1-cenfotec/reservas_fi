package ac.cr.ucr.model;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ReservationGroup {

    @Id
    private UUID reservationGroupUuid;

    @Column(nullable = false)
    private UUID userUuid;

    @Column(columnDefinition = "boolean default false")
    private boolean approvalState;

    @ElementCollection
    private List<UUID> reservationUuids;

    public ReservationGroup() {
        this.reservationGroupUuid = UUID.randomUUID();
    }

    public ReservationGroup(UUID userUuid, List<UUID> reservationUuids) {
        this();
        this.reservationGroupUuid = UUID.randomUUID();
        this.userUuid = userUuid;
        this.approvalState = false;
        this.reservationUuids = reservationUuids;
    }

    public UUID getReservationGroupUuid() {
        return reservationGroupUuid;
    }

    public void setReservationGroupUuid(UUID reservationGroupUuid) {
        this.reservationGroupUuid = reservationGroupUuid;
    }

    public UUID getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(UUID userUuid) {
        this.userUuid = userUuid;
    }

    public boolean isApprovalState() {
        return approvalState;
    }

    public void setApprovalState(boolean approvalState) {
        this.approvalState = approvalState;
    }

    public List<UUID> getReservationUuids() {
        return reservationUuids;
    }

    public void setReservationUuids(List<UUID> reservationUuids) {
        this.reservationUuids = reservationUuids;
    }

    @Override
    public String toString() {
        return "{" +
                "\"uuid\":\"" + reservationGroupUuid + "\"," +
                "\"userUuid\":\"" + userUuid + "\"," +
                "\"state\":\"" + approvalState + "\"," +
                "\"reservationUuids\":\"" + reservationUuids + "\"" +
                "}";
    }
}
