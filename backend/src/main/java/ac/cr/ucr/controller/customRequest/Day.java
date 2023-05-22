package ac.cr.ucr.controller.customRequest;

import java.util.List;

public class Day {
    private String dayName;
    private int dayNumber;
    private List<WeekdayEvent> weekdayEvents;

    public Day() {
    }

    public Day(String dayName, int dayNumber, List<WeekdayEvent> weekdayEvents) {
        this.dayName = dayName;
        this.dayNumber = dayNumber;
        this.weekdayEvents = weekdayEvents;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public List<WeekdayEvent> getWeekdayEvents() {
        return weekdayEvents;
    }

    public void setWeekdayEvents(List<WeekdayEvent> weekdayEvents) {
        this.weekdayEvents = weekdayEvents;
    }
}
