import type { NextPage } from 'next';
import { HomePage, Layout } from '@/modules';

const Home: NextPage = () => {
    return (
        <Layout title={'Home'}>
            <HomePage />
        </Layout>
    );
};

export default Home;
