package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.ReservationGroup;

import java.util.List;
import java.util.UUID;

public interface ReservationGroupInterface {
    ReservationGroup findReservationGroup(UUID reservationGroupId);

    List<ReservationGroup> findAllReservationGroups();

    ReservationGroup addReservationGroup(ReservationGroup reservationGroup);

    ReservationGroup updateReservationGroup(ReservationGroup reservationGroup, UUID reservationGroupId);

    boolean deleteReservationGroup(UUID reservationGroupId);
}
