import { Room, RoomCreateRequest, RoomUpdateRequest } from './model';

class APIClient {
    constructor(private url: string, private prefix: string) {}

    async _fetch(path: string, method: string, payload?: any) {
        return await fetch(`http://${this.url}${this.prefix}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            mode: 'same-origin',
            body: payload ? JSON.stringify(payload) : undefined,
        });
    }

    async get_rooms(): Promise<Room[]> {
        const resp = await this._fetch('/talk/room', 'GET');
        return resp.json();
    }

    async create_room(payload: RoomCreateRequest): Promise<Room> {
        const resp = await this._fetch('/talk/room', 'POST', payload);
        return resp.json();
    }

    async update_room(roomId: string, payload: RoomUpdateRequest): Promise<Room> {
        const resp = await this._fetch(`/talk/room/${roomId}`, 'POST', payload);
        return resp.json();
    }

    async delete_room(roomId: string): Promise<void> {
        const resp = await this._fetch(`/talk/room/${roomId}`, 'DELETE');
        return resp.json();
    }
}

export const apiClient = new APIClient(process.env.API_SERVER!, process.env.API_PREFIX!);
