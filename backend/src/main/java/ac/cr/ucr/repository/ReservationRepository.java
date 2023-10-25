package ac.cr.ucr.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {

    @Query("SELECT r FROM Reservation r WHERE r.roomUuid = ?1")
    List<Reservation> findByRoomUuid(UUID roomUuid);


    //@Query("SELECT r FROM Reservation r WHERE r.roomUuid = ?1 and r.startDateTime = ?2 and r.endDateTime = ?3")
    @Query("SELECT r FROM Reservation r WHERE r.roomUuid = ?1")
    List <Reservation> findByRoomUuidStartDateEndDate(UUID roomUuid, LocalDateTime startDate, LocalDateTime endDate);


}
