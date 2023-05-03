export interface RoomAvailability {
    roomAvailabilityUuid?: string;
    administratorUuid?: string;
    roomUuid?: string;
    minReservationTime: number;
    maxReservationTime: number;
    approvalRequired: boolean;
    startDateTime?: any;
    endDateTime?: any;
    privateReservationEnabled: boolean;
    availabilityPeriods: any;
}
