import { useRoom } from '@/modules/service';
import * as React from 'react';
import { RoomForm, RoomFormValues } from '../template';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export interface RoomUpdateFormContainerProps {
    roomId: string;
}

export const RoomUpdateFormContainer: React.FC<RoomUpdateFormContainerProps> = (props) => {
    const { roomId } = props;
    const router = useRouter();
    const { room, isLoading, $update } = useRoom(roomId);

    const handleSubmit = React.useCallback(
        async (form: RoomFormValues) => {
            await $update({ ...form });
            router.push('/');
        },
        [$update],
    );

    const handleCancel = React.useCallback(async () => {
        router.push('/');
    }, [router]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <RoomForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            defaultValues={{ ...room } as RoomFormValues}
        />
    );
};
