package ac.cr.ucr.controller;


import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.service.AvailabilityPeriodService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringJUnitConfig
@WebMvcTest(AvailabilityPeriodController.class)
@ActiveProfiles("test")
public class TestAvailabilityPeriodController {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AvailabilityPeriodService availabilityPeriodService;

    private AvailabilityPeriod availabilityPeriod;

    private List<AvailabilityPeriod> availabilityPeriodList;

    private UUID roomAvailabilityUuid;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        roomAvailabilityUuid = UUID.randomUUID();
        availabilityPeriod = new AvailabilityPeriod(roomAvailabilityUuid, 1, 8, 0, 10, 0);
        availabilityPeriod.setAvailabilityPeriodUuid(UUID.randomUUID());
        availabilityPeriod.setCreationDateTime(LocalDateTime.now());
        availabilityPeriodList = new ArrayList<>(Arrays.asList(availabilityPeriod));
    }

    @Test
    @DirtiesContext
    void testGetAvailabilityPeriod() throws Exception {
        when(availabilityPeriodService.findAvailabilityPeriod(any(UUID.class))).thenReturn(availabilityPeriod);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/availabilityPeriod/{uuid}", availabilityPeriod.getAvailabilityPeriodUuid())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.weekday").value(availabilityPeriod.getWeekday()))
                .andExpect(jsonPath("$.startTimeHour").value(availabilityPeriod.getStartTimeHour()))
                .andExpect(jsonPath("$.startTimeMinutes").value(availabilityPeriod.getStartTimeMinutes()))
                .andExpect(jsonPath("$.endTimeHour").value(availabilityPeriod.getEndTimeHour()))
                .andExpect(jsonPath("$.endTimeMinutes").value(availabilityPeriod.getEndTimeMinutes()))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        AvailabilityPeriod actualResult = objectMapper.readValue(content, AvailabilityPeriod.class);

        assertEquals(availabilityPeriod.getAvailabilityPeriodUuid(), actualResult.getAvailabilityPeriodUuid());
        assertEquals(availabilityPeriod.getRoomAvailabilityUuid(), actualResult.getRoomAvailabilityUuid());
        assertEquals(availabilityPeriod.getWeekday(), actualResult.getWeekday());
        assertEquals(availabilityPeriod.getStartTimeHour(), actualResult.getStartTimeHour());
        assertEquals(availabilityPeriod.getStartTimeMinutes(), actualResult.getStartTimeMinutes());
        assertEquals(availabilityPeriod.getEndTimeHour(), actualResult.getEndTimeHour());
        assertEquals(availabilityPeriod.getEndTimeMinutes(), actualResult.getEndTimeMinutes());
    }

    @Test
    @DirtiesContext
    void testGetAllAvailabilityPeriods() throws Exception {
        when(availabilityPeriodService.findAllAvailabilityPeriods()).thenReturn(availabilityPeriodList);

        mockMvc.perform(MockMvcRequestBuilders.get("/availabilityPeriod")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].weekday").value(availabilityPeriod.getWeekday()))
                .andExpect(jsonPath("$[0].startTimeHour").value(availabilityPeriod.getStartTimeHour()))
                .andExpect(jsonPath("$[0].startTimeMinutes").value(availabilityPeriod.getStartTimeMinutes()))
                .andExpect(jsonPath("$[0].endTimeHour").value(availabilityPeriod.getEndTimeHour()))
                .andExpect(jsonPath("$[0].endTimeMinutes").value(availabilityPeriod.getEndTimeMinutes()));
    }
}