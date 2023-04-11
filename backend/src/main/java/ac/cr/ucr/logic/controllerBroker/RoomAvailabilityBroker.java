package ac.cr.ucr.logic.controllerBroker;

import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
import ac.cr.ucr.logic.io.InvalidDateTimeException;
import ac.cr.ucr.logic.io.InvalidEventDurationException;
import ac.cr.ucr.model.*;
import ac.cr.ucr.service.AvailabilityPeriodService;
import ac.cr.ucr.service.RoomAvailabilityService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Controller
public class RoomAvailabilityBroker {

    @Autowired
    private RoomAvailabilityService roomAvailabilityService;
    @Autowired
    private AvailabilityPeriodService availabilityPeriodService;

    public RoomAvailabilityService getRoomAvailabilityService() {
        return roomAvailabilityService;
    }

    public void setRoomAvailabilityService(RoomAvailabilityService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }

    public AvailabilityPeriodService getAvailabilityPeriodService() {
        return availabilityPeriodService;
    }

    public void setAvailabilityPeriodService(AvailabilityPeriodService availabilityPeriodService) {
        this.availabilityPeriodService = availabilityPeriodService;
    }

    public RoomAvailabilityResponse createRoomAvailabilityWithAvailabilityPeriods(String json) {
        ScheduledRoomAvailability scheduledRoomAvailability = this.interpretScheduledRoomAvailability(json);
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
        Logger logger = Logger.getLogger(RoomAvailabilityBroker.class.getName());
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
        return roomAvailabilityService.addRoomAvailability(roomAvailability);

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
            AvailabilityPeriod savedAvailabilityPeriod = availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);
            availabilityPeriods.add(savedAvailabilityPeriod);
        }
        return availabilityPeriods;
    }
}
