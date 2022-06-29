import * as React from 'react';
import { HomeContainer } from './HomeContainer';

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = (props) => {
    return <HomeContainer />;
};
