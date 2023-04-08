package ac.cr.ucr.service;

import ac.cr.ucr.model.ReservationGroup;

import java.util.List;
import java.util.UUID;

public interface ReservationGroupService {
    ReservationGroup findReservationGroup(UUID reservationGroupId);

    List<ReservationGroup> findAllReservationGroups();

    ReservationGroup addReservationGroup(ReservationGroup reservationGroup);

    ReservationGroup updateReservationGroup(ReservationGroup reservationGroup, UUID reservationGroupId);

    boolean deleteReservationGroup(UUID reservationGroupId);
}
