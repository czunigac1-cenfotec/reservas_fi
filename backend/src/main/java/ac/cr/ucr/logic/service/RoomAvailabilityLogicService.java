package ac.cr.ucr.logic.service;

import ac.cr.ucr.controller.customRequest.ScheduledAvailabilityPeriod;
import ac.cr.ucr.controller.customRequest.ScheduledRoomAvailabilityRequest;
import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.model.*;
import ac.cr.ucr.service.AvailabilityPeriodService;
import ac.cr.ucr.service.ReservationService;
import ac.cr.ucr.service.RoomAvailabilityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;


@Service
public class RoomAvailabilityLogicService {

    @Autowired
    private AvailabilityPeriodService availabilityPeriodService;
    @Autowired

    private ReservationService reservationService;
    @Autowired
    private RoomAvailabilityService roomAvailabilityService;

    public RoomAvailabilityService getRoomAvailabilityService() {
        return roomAvailabilityService;
    }

    public RoomAvailabilityLogicService() {
    }


    public AvailabilityPeriodService getAvailabilityPeriodService() {
        return availabilityPeriodService;
    }

    public void setAvailabilityPeriodService(AvailabilityPeriodService availabilityPeriodService) {
        this.availabilityPeriodService = availabilityPeriodService;
    }

    public ReservationService getReservationService() {
        return reservationService;
    }

    public void setReservationService(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    public void setRoomAvailabilityService(RoomAvailabilityService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }

    public RoomAvailabilityResponse createRoomAvailabilityWithAvailabilityPeriods(ScheduledRoomAvailabilityRequest scheduledRoomAvailability) {
        RoomAvailability roomAvailability = this.createRoomAvailabilityFromSchedule(scheduledRoomAvailability);
        List<AvailabilityPeriod> availabilityPeriods = this.createAvailabilityPeriods(scheduledRoomAvailability, roomAvailability.getRoomAvailabilityUuid());
        List<UUID> availabilityPeriodsUuids = availabilityPeriods.stream()
                .map(AvailabilityPeriod::getAvailabilityPeriodUuid)
                .collect(Collectors.toList());

        roomAvailability.setAvailabilityPeriods(availabilityPeriodsUuids);

        roomAvailability = roomAvailabilityService.updateRoomAvailability(roomAvailability, roomAvailability.getRoomAvailabilityUuid());

        return new RoomAvailabilityResponse(roomAvailability, availabilityPeriods);
    }


    public boolean isRoomAvailable(Reservation reservationToSchedule) {
        Logger logger = Logger.getLogger(RoomAvailabilityLogicService.class.getName());

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

        RoomAvailability roomAvailability = roomAvailabilityService.findRoomAvailabilityByRoomUuid(reservationToSchedule.getRoomUuid());
        logger.info("roomAvailability");
        logger.info(roomAvailability.toString());

        // calendar long check
        if (!reservationToSchedule.getStartDateTime().isAfter(roomAvailability.getStartDateTime()) && !roomAvailability.getEndDateTime().isAfter(reservationToSchedule.getEndDateTime())) {
            logger.info("long check missed");
            return false;
        }

        // weekday check
        for (UUID availabilityPeriodUuid : roomAvailability.getAvailabilityPeriods()) {
            AvailabilityPeriod availabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(availabilityPeriodUuid);
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

    public RoomAvailability createRoomAvailabilityFromSchedule(ScheduledRoomAvailabilityRequest scheduledRoomAvailability) {
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
        return roomAvailabilityService.addRoomAvailability(roomAvailability);

    }

    public List<AvailabilityPeriod> createAvailabilityPeriods(ScheduledRoomAvailabilityRequest scheduledRoomAvailability, UUID roomAvailabilityUuid) {
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
            AvailabilityPeriod savedAvailabilityPeriod = availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);
            availabilityPeriods.add(savedAvailabilityPeriod);
        }
        return availabilityPeriods;
    }


    public boolean checkRoomReservationsForConflicts(UUID roomUUID, Reservation reservation) {
        List<Reservation> roomReservations = reservationService.findByRoomUuid(roomUUID);

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
