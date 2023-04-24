export interface Room {
    roomUuid?: string;
    roomAvailabilityUuid?: string;
    inactive?: boolean;
    code?: string;
    name?: string;
    description?: string;
    location?: string;
    capacity: number;
    creationDateTime?: string;
    administratorUuid?: string;
}
