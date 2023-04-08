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

    @Column(nullable = false)
    private boolean state;

    @ElementCollection
    private List<UUID> reservationUuids;

    public ReservationGroup() {
        this.reservationGroupUuid = UUID.randomUUID();
    }

    public ReservationGroup(UUID userUuid, boolean state, List<UUID> reservationUuids) {
        this();
        this.userUuid = userUuid;
        this.state = state;
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

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
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
                "\"state\":\"" + state + "\"," +
                "\"reservationUuids\":\"" + reservationUuids + "\"" +
                "}";
    }
}
