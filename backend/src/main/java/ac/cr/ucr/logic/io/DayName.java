package ac.cr.ucr.logic.io;

import org.springframework.util.StringUtils;

import java.time.DayOfWeek;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DayName {
    public static String interpretDayName(int dayNumber) {
        return StringUtils.capitalize(DayOfWeek.of(dayNumber).toString());
    }

    public static int interpretDayNumber(String dayName) {
        DateTimeFormatter dayOfWeekFormatter = DateTimeFormatter.ofPattern("EEEE", Locale.ENGLISH);
        WeekFields wf = WeekFields.of(Locale.ENGLISH);
        DayOfWeek day = DayOfWeek.from(dayOfWeekFormatter.parse(dayName));
        return day.get(wf.dayOfWeek());
    }
}
