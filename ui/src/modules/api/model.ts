export interface Room {
    id: string;
    name: string;
    description: string;
}

export interface RoomCreateRequest {
    name: string;
    description: string;
}

export interface RoomUpdateRequest {
    name: string;
    description: string;
}
