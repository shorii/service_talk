import * as React from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRooms } from '@/modules/service';

export interface HomeContainerProps {}

export const HomeContainer: React.FC<HomeContainerProps> = (props) => {
    const { rooms, isLoading, $create, $update, $delete } = useRooms();

    const handleCreate = React.useCallback(() => {}, [$create]);
    const handleUpdate = React.useCallback(() => {}, [$update]);
    const handleDelete = React.useCallback(() => {}, [$delete]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rooms!.map((x, idx) => {
                    return (
                        <TableRow key={idx}>
                            <TableCell>{x.name}</TableCell>
                            <TableCell>{x.description}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
