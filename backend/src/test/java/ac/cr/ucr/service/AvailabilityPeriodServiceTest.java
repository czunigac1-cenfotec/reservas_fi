package ac.cr.ucr.service;

import ac.cr.ucr.model.AvailabilityPeriod;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class AvailabilityPeriodServiceTest {
    @Autowired
    public AvailabilityPeriodService availabilityPeriodService;

    @Test
    @DirtiesContext
    void testFindAvailabilityPeriod() {

        // Step 1
        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(UUID.randomUUID(), 1, 8, 0, 10, 0);

        // Step 2
        AvailabilityPeriod savedAvailabilityPeriod = this.availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);

        // Step 3

        AvailabilityPeriod retrievedAvailabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(savedAvailabilityPeriod.getAvailabilityPeriodUuid());

        // Step 4
        assertEquals(availabilityPeriod.getRoomAvailabilityUuid(), retrievedAvailabilityPeriod.getRoomAvailabilityUuid());
        assertEquals(availabilityPeriod.getWeekday(), retrievedAvailabilityPeriod.getWeekday());
        assertEquals(availabilityPeriod.getStartTimeHour(), retrievedAvailabilityPeriod.getStartTimeHour());
        assertEquals(availabilityPeriod.getStartTimeMinutes(), retrievedAvailabilityPeriod.getStartTimeMinutes());
        assertEquals(availabilityPeriod.getEndTimeHour(), retrievedAvailabilityPeriod.getEndTimeHour());
        assertEquals(availabilityPeriod.getEndTimeMinutes(), retrievedAvailabilityPeriod.getEndTimeMinutes());
    }


    @Test
    @DirtiesContext
    void testFindAllAvailabilityPeriods() {

        List<AvailabilityPeriod> allAvailabilityPeriods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertEquals(0, allAvailabilityPeriods.size());

        // Step 1
        AvailabilityPeriod availabilityPeriod1 = new AvailabilityPeriod(UUID.randomUUID(), 1, 8, 0, 10, 0);
        AvailabilityPeriod availabilityPeriod2 = new AvailabilityPeriod(UUID.randomUUID(), 2, 8, 0, 10, 0);
        AvailabilityPeriod availabilityPeriod3 = new AvailabilityPeriod(UUID.randomUUID(), 3, 8, 0, 10, 0);

        // Step 2
        availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod1);
        availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod2);
        availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod3);

        // Step 3
        allAvailabilityPeriods = availabilityPeriodService.findAllAvailabilityPeriods();

        // Step 4
        assertEquals(3, allAvailabilityPeriods.size());
        assertEquals(allAvailabilityPeriods.get(0).getAvailabilityPeriodUuid(), availabilityPeriod1.getAvailabilityPeriodUuid());
        assertEquals(allAvailabilityPeriods.get(1).getAvailabilityPeriodUuid(), availabilityPeriod2.getAvailabilityPeriodUuid());
        assertEquals(allAvailabilityPeriods.get(2).getAvailabilityPeriodUuid(), availabilityPeriod3.getAvailabilityPeriodUuid());

    }


    @Test
    @DirtiesContext
    void testAddAvailabilityPeriod() {
        // Step 1
        List<AvailabilityPeriod> allAvailabilityPeriods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertEquals(0, allAvailabilityPeriods.size());

        // Step 2
        AvailabilityPeriod availabilityPeriod1 = new AvailabilityPeriod(UUID.randomUUID(), 1, 8, 0, 10, 0);
        AvailabilityPeriod savedAvailabilityPeriod1 = availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod1);

        // Step 3
        allAvailabilityPeriods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertEquals(1, allAvailabilityPeriods.size());

        // Step 4
        AvailabilityPeriod availabilityPeriod2 = new AvailabilityPeriod(UUID.randomUUID(), 2, 11, 0, 13, 0);
        AvailabilityPeriod savedAvailabilityPeriod2 = availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod2);

        // Step 5
        allAvailabilityPeriods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertEquals(2, allAvailabilityPeriods.size());

        // Step 6
        assertNotNull(savedAvailabilityPeriod1.getAvailabilityPeriodUuid());
        assertNotNull(savedAvailabilityPeriod2.getAvailabilityPeriodUuid());
        assertNotEquals(savedAvailabilityPeriod1.getAvailabilityPeriodUuid(), savedAvailabilityPeriod2.getAvailabilityPeriodUuid());
    }


    @Test
    @DirtiesContext
    void testUpdateAvailabilityPeriod() {
        // Step 1: create an availabilityPeriod with weekday 1
        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(UUID.randomUUID(), 1, 8, 0, 10, 0);
        AvailabilityPeriod savedAvailabilityPeriod = availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);

        // Step 2: query this by remembering the uuid, and check that weekday is 1
        AvailabilityPeriod retrievedAvailabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(savedAvailabilityPeriod.getAvailabilityPeriodUuid());
        assertEquals(1, retrievedAvailabilityPeriod.getWeekday());

        // Step 3: generate a random weekday int between 0 and 6 (0=sunday,1=monday,...)
        int randomWeekday = ThreadLocalRandom.current().nextInt(7);

        // Step 4: we update the weekday on the created availabilityPeriod with the random one
        savedAvailabilityPeriod.setWeekday(randomWeekday);
        availabilityPeriodService.updateAvailabilityPeriod(savedAvailabilityPeriod, savedAvailabilityPeriod.getAvailabilityPeriodUuid());

        // Step 5: we query for using findbyuuid function from service and check that weekday matches the random one
        retrievedAvailabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(savedAvailabilityPeriod.getAvailabilityPeriodUuid());
        assertEquals(randomWeekday, retrievedAvailabilityPeriod.getWeekday());
    }

    @Test
    @DirtiesContext
    public void testUpdateAvailabilityPeriodNonExistent() {
        List<AvailabilityPeriod> periods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertTrue(periods.isEmpty());

        // Add a new availability period
        AvailabilityPeriod newPeriod = new AvailabilityPeriod();
        newPeriod.setRoomAvailabilityUuid(UUID.randomUUID());
        newPeriod.setWeekday(1);
        newPeriod.setStartTimeHour(9);
        newPeriod.setStartTimeMinutes(0);
        newPeriod.setEndTimeHour(12);
        newPeriod.setEndTimeMinutes(0);

        AvailabilityPeriod createdPeriod = availabilityPeriodService.addAvailabilityPeriod(newPeriod);
        assertNotNull(createdPeriod);

        // Query the created availability period and check its attributes
        AvailabilityPeriod queriedPeriod = availabilityPeriodService.findAvailabilityPeriod(createdPeriod.getAvailabilityPeriodUuid());
        assertEquals(createdPeriod.getAvailabilityPeriodUuid(), queriedPeriod.getAvailabilityPeriodUuid());
        assertEquals(createdPeriod.getRoomAvailabilityUuid(), queriedPeriod.getRoomAvailabilityUuid());
        assertEquals(createdPeriod.getWeekday(), queriedPeriod.getWeekday());
        assertEquals(createdPeriod.getStartTimeHour(), queriedPeriod.getStartTimeHour());
        assertEquals(createdPeriod.getStartTimeMinutes(), queriedPeriod.getStartTimeMinutes());
        assertEquals(createdPeriod.getEndTimeHour(), queriedPeriod.getEndTimeHour());
        assertEquals(createdPeriod.getEndTimeMinutes(), queriedPeriod.getEndTimeMinutes());
        assertEquals(createdPeriod.getCreationDateTime(), queriedPeriod.getCreationDateTime());

        // Update the created availability period and check that the return value is null
        AvailabilityPeriod updatedPeriod = availabilityPeriodService.updateAvailabilityPeriod(createdPeriod, UUID.randomUUID());
        assertNull(updatedPeriod);
    }



    @Test
    @DirtiesContext
    public void testDeleteAvailabilityPeriod() {
        // Check that repository is empty
        assertEquals(0, availabilityPeriodService.findAllAvailabilityPeriods().size());

        // Create an availability period
        UUID roomAvailabilityUuid = UUID.randomUUID();
        AvailabilityPeriod availabilityPeriod = new AvailabilityPeriod(roomAvailabilityUuid, 1, 9, 0, 10, 0);
        availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);

        // Query for it using UUID and check that it exists
        AvailabilityPeriod foundAvailabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(availabilityPeriod.getAvailabilityPeriodUuid());
        assertNotNull(foundAvailabilityPeriod);

        // Delete it
        availabilityPeriodService.deleteAvailabilityPeriod(foundAvailabilityPeriod.getAvailabilityPeriodUuid());

        // Query for it and assert the return is null
        foundAvailabilityPeriod = availabilityPeriodService.findAvailabilityPeriod(availabilityPeriod.getAvailabilityPeriodUuid());
        assertNull(foundAvailabilityPeriod);
    }

    @Test
    @DirtiesContext
    public void testDeleteAvailabilityPeriodNonExistent() {
        List<AvailabilityPeriod> periods = availabilityPeriodService.findAllAvailabilityPeriods();
        assertTrue(periods.isEmpty());

        // Add a new availability period
        AvailabilityPeriod newPeriod = new AvailabilityPeriod();
        newPeriod.setRoomAvailabilityUuid(UUID.randomUUID());
        newPeriod.setWeekday(1);
        newPeriod.setStartTimeHour(9);
        newPeriod.setStartTimeMinutes(0);
        newPeriod.setEndTimeHour(12);
        newPeriod.setEndTimeMinutes(0);

        AvailabilityPeriod createdPeriod = availabilityPeriodService.addAvailabilityPeriod(newPeriod);
        assertNotNull(createdPeriod);

        // Query the created availability period and check its attributes
        AvailabilityPeriod queriedPeriod = availabilityPeriodService.findAvailabilityPeriod(createdPeriod.getAvailabilityPeriodUuid());
        assertEquals(createdPeriod.getAvailabilityPeriodUuid(), queriedPeriod.getAvailabilityPeriodUuid());
        assertEquals(createdPeriod.getRoomAvailabilityUuid(), queriedPeriod.getRoomAvailabilityUuid());
        assertEquals(createdPeriod.getWeekday(), queriedPeriod.getWeekday());
        assertEquals(createdPeriod.getStartTimeHour(), queriedPeriod.getStartTimeHour());
        assertEquals(createdPeriod.getStartTimeMinutes(), queriedPeriod.getStartTimeMinutes());
        assertEquals(createdPeriod.getEndTimeHour(), queriedPeriod.getEndTimeHour());
        assertEquals(createdPeriod.getEndTimeMinutes(), queriedPeriod.getEndTimeMinutes());
        assertEquals(createdPeriod.getCreationDateTime(), queriedPeriod.getCreationDateTime());

        // Update the created availability period and check that the return value is null
        assertFalse(availabilityPeriodService.deleteAvailabilityPeriod(UUID.randomUUID()));
    }



}
