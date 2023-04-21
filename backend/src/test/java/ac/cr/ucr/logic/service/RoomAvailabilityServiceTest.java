//package ac.cr.ucr.logic.service;
//
//import ac.cr.ucr.controller.customResponse.RoomAvailabilityResponse;
//import ac.cr.ucr.logic.service.RoomAvailabilityService;
//import ac.cr.ucr.model.*;
//import ac.cr.ucr.repository.functional.*;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//import java.util.UUID;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.junit.jupiter.api.Assertions.*;
//
//public class RoomAvailabilityServiceTest {
//
//    @Mock
//    private AvailabilityPeriodInterface availabilityPeriodInterface;
//
//    @Mock
//    private ReservationInterface reservationInterface;
//
//    @Mock
//    private RoomAvailabilityInterface roomAvailabilityInterface;
//
//    @Mock
//    private UserInfoInterface userInfoInterface;
//
//    @Mock
//    private RoomInterface roomInterface;
//
//    @InjectMocks
//    private RoomAvailabilityService roomAvailabilityService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testCreateRoomAvailabilityWithAvailabilityPeriods() {
//        String json = "{\"startDateTime\":\"2023-04-12T08:00:00\",\"endDateTime\":\"2023-04-12T10:00:00\",\"weekday\":2,\"startTimeHour\":8,\"startTimeMinutes\":0,\"endTimeHour\":10,\"endTimeMinutes\":0}";
//        UserInfo testingUserInfo = new UserInfo(
//                "testing@testing.test",
//                "Testing",
//                "Max",
//                "Williams",
//                "00000001",
//                "TestingUnit",
//                "55551234"
//        );
//        UserInfo createdTestingUserInfo = userInfoInterface.addUserInfo(testingUserInfo);
//        Room testingRoom = new Room(
//                "TEST-001",
//        "Testing-001",
//        "Testing room",
//        "TESTING_A",
//        30,
//                createdTestingUserInfo.getUserInfoUuid()
//        );
//
//        Room createdTestingRoom = roomInterface.addRoom(testingRoom);
//
//        when(roomAvailabilityInterface.updateRoomAvailability(any(), any())).thenReturn(roomAvailability);
//        when(availabilityPeriodInterface.addAvailabilityPeriod(any())).thenReturn(availabilityPeriod);
//
//        RoomAvailabilityResponse result = roomAvailabilityService.createRoomAvailabilityWithAvailabilityPeriods(json);
//
//        assertNotNull(result);
//        assertEquals(roomAvailability, result.getRoomAvailability());
//        assertEquals(Collections.singletonList(availabilityPeriod.getAvailabilityPeriodUuid()), result.getAvailabilityPeriods());
//    }
//
//}
