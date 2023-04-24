export interface AvailabilityPeriod {
    availabilityPeriodUuid?: string;
    roomAvailabilityUuid?: string;
    weekday?: number;
    startTimeHour?: number;
    startTimeMinutes?: number;
    endTimeHour?: string;
    endTimeMinutes?: string;
}