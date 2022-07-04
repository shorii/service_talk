import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { RoomUpdateFormPage as Module_RoomUpdateFormPage, Layout } from '@/modules';

const RoomUpdateFormPage: NextPage = () => {
    const router = useRouter();
    const { roomId } = router.query;
    return (
        <Layout title={'Update Room'}>
            <Module_RoomUpdateFormPage roomId={roomId as string} />
        </Layout>
    );
};

export default RoomUpdateFormPage;
