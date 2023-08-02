package ac.cr.ucr.controller.customResponse;

import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.model.ReservationGroup;

import java.util.List;

public class ReservationGroupResponse {

    public ReservationGroup reservationGroup;
    public List<Reservation> reservations;

    public ReservationGroupResponse(ReservationGroup reservationGroup, List<Reservation> reservations) {
        this.reservationGroup = reservationGroup;
        this.reservations = reservations;
    }

    public ReservationGroup getReservationGroup() {
        return reservationGroup;
    }

    public void setReservationGroup(ReservationGroup reservationGroup) {
        this.reservationGroup = reservationGroup;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}

