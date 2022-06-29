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

export const useRooms = () => {
    const key = 'Room';
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR(key, apiClient.get_rooms);

    const $create = React.useCallback(
        async (request: model_RoomCreateRequest) => {
            const payload: api_RoomCreateRequest = {
                ...request,
            };
            const newRoom = await apiClient.create_room(payload);
            mutate(key, [newRoom, ...(data ?? [])]);
        },
        [mutate, data],
    );

    const $update = React.useCallback(
        async (roomId: string, request: model_RoomUpdateRequest) => {
            const payload: api_RoomUpdateRequest = {
                ...request,
            };
            const updatedRoom = await apiClient.update_room(roomId, payload);
            const index = data?.findIndex((x) => x.id == roomId);
            mutate(key, [...(data?.splice(index!, 1, updatedRoom) ?? [])]);
        },
        [mutate, data],
    );

    const $delete = React.useCallback(
        async (roomId: string) => {
            await apiClient.delete_room(roomId);
            mutate(key, [...(data?.filter((x) => x.id != roomId) ?? [])]);
        },
        [mutate, data],
    );

    return {
        rooms: data,
        isLoading: !error && !data,
        isError: error,
        $create,
        $update,
        $delete,
    };
};
