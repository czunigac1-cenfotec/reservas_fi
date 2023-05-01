package ac.cr.ucr.model;

public class  ScheduledAvailabilityPeriod {

    private int dayNumber;

    private String dayName;

    private int startTimeHour;

    private int startTimeMinutes;

    private int endTimeHour;

    private int endTimeMinutes;

    public ScheduledAvailabilityPeriod() {
    }

    public ScheduledAvailabilityPeriod(int dayNumber, String dayName, int startTimeHour, int startTimeMinutes, int endTimeHour, int endTimeMinutes) {
        this.dayNumber = dayNumber;
        this.dayName = dayName;
        this.startTimeHour = startTimeHour;
        this.startTimeMinutes = startTimeMinutes;
        this.endTimeHour = endTimeHour;
        this.endTimeMinutes = endTimeMinutes;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public int getStartTimeHour() {
        return startTimeHour;
    }

    public void setStartTimeHour(int startTimeHour) {
        this.startTimeHour = startTimeHour;
    }

    public int getStartTimeMinutes() {
        return startTimeMinutes;
    }

    public void setStartTimeMinutes(int startTimeMinutes) {
        this.startTimeMinutes = startTimeMinutes;
    }

    public int getEndTimeHour() {
        return endTimeHour;
    }

    public void setEndTimeHour(int endTimeHour) {
        this.endTimeHour = endTimeHour;
    }

    public int getEndTimeMinutes() {
        return endTimeMinutes;
    }

    public void setEndTimeMinutes(int endTimeMinutes) {
        this.endTimeMinutes = endTimeMinutes;
    }
}
