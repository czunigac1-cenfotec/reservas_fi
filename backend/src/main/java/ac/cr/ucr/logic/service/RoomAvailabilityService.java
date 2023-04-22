package ac.cr.ucr.logic.service;

import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.model.RoomAvailability;
import ac.cr.ucr.model.ScheduledAvailabilityPeriod;
import ac.cr.ucr.model.ScheduledRoomAvailability;
import ac.cr.ucr.repository.functional.AvailabilityPeriodInterface;
import ac.cr.ucr.repository.functional.ReservationInterface;
import ac.cr.ucr.repository.functional.RoomAvailabilityInterface;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class RoomAvailabilityService {

    private AvailabilityPeriodInterface availabilityPeriodInterface;
    private ReservationInterface reservationInterface;
    private RoomAvailabilityInterface roomAvailabilityInterface;

    public RoomAvailabilityInterface getRoomAvailabilityInterface() {
        return roomAvailabilityInterface;
    }

    public RoomAvailabilityService() {
    }

    @Autowired
    public RoomAvailabilityService(AvailabilityPeriodInterface availabilityPeriodInterface, ReservationInterface reservationInterface, RoomAvailabilityInterface roomAvailabilityInterface) {
        this.availabilityPeriodInterface = availabilityPeriodInterface;
        this.reservationInterface = reservationInterface;
        this.roomAvailabilityInterface = roomAvailabilityInterface;
    }

    public AvailabilityPeriodInterface getAvailabilityPeriodInterface() {
        return availabilityPeriodInterface;
    }

    public void setAvailabilityPeriodInterface(AvailabilityPeriodInterface availabilityPeriodInterface) {
        this.availabilityPeriodInterface = availabilityPeriodInterface;
    }

    public ReservationInterface getReservationInterface() {
        return reservationInterface;
    }

    public void setReservationInterface(ReservationInterface reservationInterface) {
        this.reservationInterface = reservationInterface;
    }

    public void setRoomAvailabilityInterface(RoomAvailabilityInterface roomAvailabilityInterface) {
        this.roomAvailabilityInterface = roomAvailabilityInterface;
    }

    public RoomAvailabilityResponse createRoomAvailabilityWithAvailabilityPeriods(String json) {
        ScheduledRoomAvailability scheduledRoomAvailability = this.interpretScheduledRoomAvailability(json);
        RoomAvailability roomAvailability = this.createRoomAvailabilityFromSchedule(scheduledRoomAvailability);
        List<AvailabilityPeriod> availabilityPeriods = this.createAvailabilityPeriods(scheduledRoomAvailability, roomAvailability.getRoomAvailabilityUuid());
        List<UUID> availabilityPeriodsUuids = availabilityPeriods.stream()
                .map(AvailabilityPeriod::getAvailabilityPeriodUuid)
                .collect(Collectors.toList());

        roomAvailability.setAvailabilityPeriods(availabilityPeriodsUuids);

        roomAvailability = roomAvailabilityInterface.updateRoomAvailability(roomAvailability, roomAvailability.getRoomAvailabilityUuid());

        return new RoomAvailabilityResponse(roomAvailability, availabilityPeriods);
    }


    public boolean isRoomAvailable(Reservation reservationToSchedule) {
        Logger logger = Logger.getLogger(RoomAvailabilityService.class.getName());

        if (checkRoomReservationsForConflicts(reservationToSchedule.getRoomUuid(), reservationToSchedule)) {
            logger.info("reservation conflict");
            return false;
        }

        int startDayNumber = reservationToSchedule.getStartDateTime().getDayOfWeek().getValue();
        int endDayNumber = reservationToSchedule.getEndDateTime().getDayOfWeek().getValue();

        int startDayHour = reservationToSchedule.getStartDateTime().getHour();
        int startDayMinute = reservationToSchedule.getStartDateTime().getMinute();
        int startEventHourMinute = Integer.parseInt(startDayHour + "" + startDayMinute);

        int endDayHour = reservationToSchedule.getEndDateTime().getHour();
        int endDayMinute = reservationToSchedule.getEndDateTime().getMinute();
        int endEventHourMinute = Integer.parseInt(endDayHour + "" + endDayMinute);

        int eventDuration = (int) ChronoUnit.MINUTES.between(reservationToSchedule.getStartDateTime(), reservationToSchedule.getEndDateTime());

        RoomAvailability roomAvailability = roomAvailabilityInterface.findRoomAvailabilityByRoomUuid(reservationToSchedule.getRoomUuid());
        logger.info("roomAvailability");
        logger.info(roomAvailability.toString());

        // calendar long check
        if (!reservationToSchedule.getStartDateTime().isAfter(roomAvailability.getStartDateTime()) && !roomAvailability.getEndDateTime().isAfter(reservationToSchedule.getEndDateTime())) {
            logger.info("long check missed");
            return false;
        }

        // weekday check
        for (UUID availabilityPeriodUuid : roomAvailability.getAvailabilityPeriods()) {
            AvailabilityPeriod availabilityPeriod = availabilityPeriodInterface.findAvailabilityPeriod(availabilityPeriodUuid);
            // event start day number and end day number should always match
            if (startDayNumber == availabilityPeriod.getWeekday() && endDayNumber == availabilityPeriod.getWeekday()) {
                // event duration check
                if (!(roomAvailability.getMinReservationTime() <= eventDuration) || !(eventDuration <= roomAvailability.getMaxReservationTime())) {
                    //throw new InvalidEventDurationException();
                    logger.info("InvalidEventDurationException");
                    logger.info(Integer.toString(eventDuration));
                    return false;
                }
                int startRestrictionHourMinute = Integer.parseInt(availabilityPeriod.getStartTimeHour() + "" + availabilityPeriod.getStartTimeMinutes());
                int endRestrictionHourMinute = Integer.parseInt(availabilityPeriod.getEndTimeHour() + "" + availabilityPeriod.getEndTimeMinutes());

                // weekday event level start and end hour:minute combination check
                if (startRestrictionHourMinute <= startEventHourMinute && endEventHourMinute <= endRestrictionHourMinute) {
                    return true;
                }
            }
        }
        // is possible that a reservation weekday never matches to any availabilityPeriod weekday, rendering it non-possible
        //throw new InvalidDateTimeException();
        logger.info("InvalidDateTimeException");
        return false;
    }


    public ScheduledRoomAvailability interpretScheduledRoomAvailability(String scheduleJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            ScheduledRoomAvailability scheduledRoomAvailability = objectMapper.readValue(scheduleJson, ScheduledRoomAvailability.class);
            return scheduledRoomAvailability;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public RoomAvailability createRoomAvailabilityFromSchedule(ScheduledRoomAvailability scheduledRoomAvailability) {
        List<UUID> availabilityPeriodsUuids = new ArrayList<>();
        RoomAvailability roomAvailability = new RoomAvailability(
                scheduledRoomAvailability.getRoomUuid(),
                scheduledRoomAvailability.getMinReservationTime(),
                scheduledRoomAvailability.getMaxReservationTime(),
                scheduledRoomAvailability.getAdministratorUuid(),
                scheduledRoomAvailability.getStartDateTime(),
                scheduledRoomAvailability.getEndDateTime(),
                scheduledRoomAvailability.isPrivateReservationEnabled(),
                availabilityPeriodsUuids
        );
        return roomAvailabilityInterface.addRoomAvailability(roomAvailability);

    }

    public List<AvailabilityPeriod> createAvailabilityPeriods(ScheduledRoomAvailability scheduledRoomAvailability, UUID roomAvailabilityUuid) {
        List<AvailabilityPeriod> availabilityPeriods = new ArrayList<>();
        for (ScheduledAvailabilityPeriod scheduledAvailabilityPeriod :
                scheduledRoomAvailability.getAvailabilityPeriods()) {
            AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(
                    roomAvailabilityUuid,
                    scheduledAvailabilityPeriod.getDayNumber(),
                    scheduledAvailabilityPeriod.getStartTimeHour(),
                    scheduledAvailabilityPeriod.getStartTimeMinutes(),
                    scheduledAvailabilityPeriod.getEndTimeHour(),
                    scheduledAvailabilityPeriod.getEndTimeMinutes()
            );
            AvailabilityPeriod savedAvailabilityPeriod = availabilityPeriodInterface.addAvailabilityPeriod(availabilityPeriod);
            availabilityPeriods.add(savedAvailabilityPeriod);
        }
        return availabilityPeriods;
    }


    public boolean checkRoomReservationsForConflicts(UUID roomUUID, Reservation reservation) {
        List<Reservation> roomReservations = reservationInterface.findByRoomUuid(roomUUID);

        for (Reservation roomReservation : roomReservations) {
            // Check if reservation start time is within the range of room reservation
            if (reservation.getStartDateTime().isAfter(roomReservation.getStartDateTime())
                    && reservation.getStartDateTime().isBefore(roomReservation.getEndDateTime())) {
                return true; // Conflict found
            }

            // Check if reservation end time is within the range of room reservation
            if (reservation.getEndDateTime().isAfter(roomReservation.getStartDateTime())
                    && reservation.getEndDateTime().isBefore(roomReservation.getEndDateTime())) {
                return true; // Conflict found
            }

            // Check if reservation start time and end time completely overlap room reservation
            if (reservation.getStartDateTime().isBefore(roomReservation.getStartDateTime())
                    && reservation.getEndDateTime().isAfter(roomReservation.getEndDateTime())) {
                return true; // Conflict found
            }
        }

        return false; // No conflicts found
    }

}
