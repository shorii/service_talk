import * as React from 'react';
import { RoomUpdateFormContainer } from '../container';

export interface RoomUpdateFormPageProps {
    roomId: string;
}

export const RoomUpdateFormPage: React.FC<RoomUpdateFormPageProps> = (props) => {
    return <RoomUpdateFormContainer {...props} />;
};
