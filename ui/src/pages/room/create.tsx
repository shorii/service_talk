import type { NextPage } from 'next';
import { RoomCreateFormPage as Module_RoomCreateFormPage, Layout } from '@/modules';

const RoomCreateFormPage: NextPage = () => {
    return (
        <Layout title={'Create Room'}>
            <Module_RoomCreateFormPage />
        </Layout>
    );
};

export default RoomCreateFormPage;
