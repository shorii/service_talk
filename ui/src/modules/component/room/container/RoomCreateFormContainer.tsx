import { useRooms } from '@/modules/service';
import * as React from 'react';
import { RoomForm, RoomFormValues } from '../template';
import { useRouter } from 'next/router';

export interface RoomCreateFormContainerProps {}

export const RoomCreateFormContainer: React.FC<RoomCreateFormContainerProps> = (props) => {
    const router = useRouter();
    const { $create } = useRooms();

    const handleSubmit = React.useCallback(
        async (form: RoomFormValues) => {
            await $create({ ...form });
            router.push('/');
        },
        [$create],
    );

    const handleCancel = React.useCallback(async () => {
        router.push('/');
    }, [router]);

    return <RoomForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};
