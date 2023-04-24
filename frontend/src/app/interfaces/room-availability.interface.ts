export interface RoomAvailability {
    roomAvailabilityUuid?: string;
    administratorUuid?: string;
    roomUuid?: string;
    minReservationTime: number;
    nammaxReservationTime: number;
    approvalRequired: boolean;
    startDateTime?: string;
    endDateTime?: string;
    creationDateTime?: string;
    privateReservationEnabled: boolean;
    availabilityPeriods: [];
}
