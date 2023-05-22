package ac.cr.ucr.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class TestAvailabilityPeriod {

    @Test
    public void testGettersAndSetters() {
        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod();

        UUID availabilityPeriodUuid = UUID.randomUUID();
        UUID roomAvailabilityUuid = UUID.randomUUID();
        int weekday = 1;
        int startTimeHour = 8;
        int startTimeMinutes = 0;
        int endTimeHour = 10;
        int endTimeMinutes = 0;
        LocalDateTime creationDateTime = LocalDateTime.now();

        availabilityPeriod.setAvailabilityPeriodUuid(availabilityPeriodUuid);
        availabilityPeriod.setRoomAvailabilityUuid(roomAvailabilityUuid);
        availabilityPeriod.setWeekday(weekday);
        availabilityPeriod.setStartTimeHour(startTimeHour);
        availabilityPeriod.setStartTimeMinutes(startTimeMinutes);
        availabilityPeriod.setEndTimeHour(endTimeHour);
        availabilityPeriod.setEndTimeMinutes(endTimeMinutes);
        availabilityPeriod.setCreationDateTime(creationDateTime);

        assertEquals(availabilityPeriodUuid, availabilityPeriod.getAvailabilityPeriodUuid());
        assertEquals(roomAvailabilityUuid, availabilityPeriod.getRoomAvailabilityUuid());
        assertEquals(weekday, availabilityPeriod.getWeekday());
        assertEquals(startTimeHour, availabilityPeriod.getStartTimeHour());
        assertEquals(startTimeMinutes, availabilityPeriod.getStartTimeMinutes());
        assertEquals(endTimeHour, availabilityPeriod.getEndTimeHour());
        assertEquals(endTimeMinutes, availabilityPeriod.getEndTimeMinutes());
        assertEquals(creationDateTime, availabilityPeriod.getCreationDateTime());
    }

    @Test
    public void testConstructor() {
        UUID roomAvailabilityUuid = UUID.randomUUID();
        int weekday = 1;
        int startTimeHour = 8;
        int startTimeMinutes = 0;
        int endTimeHour = 10;
        int endTimeMinutes = 0;

        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(roomAvailabilityUuid, weekday, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes);

        assertNotNull(availabilityPeriod.getAvailabilityPeriodUuid());
        assertEquals(roomAvailabilityUuid, availabilityPeriod.getRoomAvailabilityUuid());
        assertEquals(weekday, availabilityPeriod.getWeekday());
        assertEquals(startTimeHour, availabilityPeriod.getStartTimeHour());
        assertEquals(startTimeMinutes, availabilityPeriod.getStartTimeMinutes());
        assertEquals(endTimeHour, availabilityPeriod.getEndTimeHour());
        assertEquals(endTimeMinutes, availabilityPeriod.getEndTimeMinutes());
        assertNotNull(availabilityPeriod.getCreationDateTime());
    }

    @Test
    public void testToString() {
        UUID availabilityPeriodUuid = UUID.fromString("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11");
        UUID roomAvailabilityUuid = UUID.fromString("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22");
        int weekday = 1;
        int startTimeHour = 8;
        int startTimeMinutes = 0;
        int endTimeHour = 9;
        int endTimeMinutes = 0;
        LocalDateTime creationDateTime = LocalDateTime.of(2023, 5, 3, 15, 30);

        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(roomAvailabilityUuid, weekday, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes);
        availabilityPeriod.setAvailabilityPeriodUuid(availabilityPeriodUuid);
        availabilityPeriod.setCreationDateTime(creationDateTime);

        String expectedOutput = "{\"availabilityPeriodUuid\":\"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11\",\"weekday\":\"1\",\"startTimeHour\":\"8\",\"startTimeMinutes\":\"0\",\"endTimeHour\":\"9\",\"endTimeMinutes\":\"0\",\"creationDateTime\":\"2023-05-03T15:30\"}";

        assertEquals(expectedOutput, availabilityPeriod.toString());
    }

}
