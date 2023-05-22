package ac.cr.ucr.controller.customRequest;

import java.util.List;
import java.util.UUID;

public class ScheduleRequest {
    private List<Day> weekdays;

    private UUID userUuid;

    public ScheduleRequest() {
    }

    public ScheduleRequest(List<Day> weekdays, UUID userUuid) {
        this.weekdays = weekdays;
        this.userUuid = userUuid;
    }

    public List<Day> getWeekdays() {
        return weekdays;
    }

    public void setWeekdays(List<Day> weekdays) {
        this.weekdays = weekdays;
    }

    public UUID getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(UUID userUuid) {
        this.userUuid = userUuid;
    }

    @Override
    public String toString() {
        return "{"
                + "\"weekdays\": \"" + weekdays + "\", "
                + "\"userUuid\": \"" + userUuid
                + "}";
    }
}
