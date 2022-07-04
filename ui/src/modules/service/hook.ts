import * as React from 'react';
import {
    apiClient,
    RoomCreateRequest as api_RoomCreateRequest,
    RoomUpdateRequest as api_RoomUpdateRequest,
} from '../api';
import useSWR, { useSWRConfig } from 'swr';
import {
    RoomCreateRequest as model_RoomCreateRequest,
    RoomUpdateRequest as model_RoomUpdateRequest,
} from './model';

const keys = {
    room: (roomId: string) => `Room(${roomId})`,
    rooms: () => 'Rooms',
};

export const useRoom = (roomId: string) => {
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR(keys.room(roomId), (_) => apiClient.get_room(roomId));

    const $update = React.useCallback(
        async (request: model_RoomUpdateRequest) => {
            const payload: api_RoomUpdateRequest = {
                ...request,
            };
            const updatedRoom = await apiClient.update_room(roomId, payload);
            mutate(keys.room(roomId), updatedRoom);
            mutate(keys.rooms());
        },
        [mutate, data, roomId],
    );
    return {
        room: data,
        isLoading: error || !data,
        isError: error,
        $update,
    };
};

export const useRooms = () => {
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR(keys.rooms(), (_) => apiClient.get_rooms());

    const $create = React.useCallback(
        async (request: model_RoomCreateRequest) => {
            const payload: api_RoomCreateRequest = {
                ...request,
            };
            const newRoom = await apiClient.create_room(payload);
            mutate(keys.rooms(), [newRoom, ...(data ?? [])]);
        },
        [mutate, data],
    );

    const $delete = React.useCallback(
        async (roomId: string) => {
            await apiClient.delete_room(roomId);
            mutate(keys.rooms(), [...(data?.filter((x) => x.id != roomId) ?? [])]);
            mutate(keys.room(roomId));
        },
        [mutate, data],
    );

    return {
        rooms: data,
        isLoading: error || !data,
        isError: error,
        $create,
        $delete,
    };
};
