import * as React from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRooms } from '@/modules/service';
import { useRouter } from 'next/router';

export interface HomeContainerProps {}

export const HomeContainer: React.FC<HomeContainerProps> = (props) => {
    const router = useRouter();
    const { rooms: all, isLoading, $delete } = useRooms();
    const [keyword, setKeyword] = React.useState('');
    const [roomId, setRoomId] = React.useState<string | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const rooms = React.useMemo(() => {
        if (!all) {
            return [];
        }
        return all.filter((x) => x.name.includes(keyword));
    }, [all]);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const keyword = e.target.value;
            setKeyword(keyword);
        },
        [setKeyword],
    );

    const handleCreate = React.useCallback(() => {
        router.push(`/room/create`);
    }, [router]);

    const handleEdit = React.useCallback(() => {
        if (!roomId) {
            return;
        }
        router.push(`/room/${roomId}/update`);
    }, [router, roomId]);

    const handleDelete = React.useCallback(() => {
        // TODO implement
        console.log(roomId);
    }, [roomId]);

    const handleClick = React.useCallback(
        (roomId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(e.currentTarget);
            setRoomId(roomId);
        },
        [],
    );

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
        setRoomId(null);
    }, []);

    const open = React.useMemo(() => {
        return !!anchorEl && !!roomId;
    }, [anchorEl, roomId]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Grid container direction="column" style={{ padding: 16 }}>
                <Grid item>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <TextField
                                value={keyword}
                                label="search"
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item style={{ display: 'flex' }}>
                            <Button
                                startIcon={<CreateOutlinedIcon />}
                                variant="outlined"
                                onClick={handleCreate}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>name</TableCell>
                                <TableCell>description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms!.map((x, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{x.name}</TableCell>
                                        <TableCell>{x.description}</TableCell>
                                        <TableCell style={{ width: 32 }}>
                                            <IconButton onClick={handleClick(x.id)}>
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
                <Grid container direction="column">
                    <Grid item>
                        <Button onClick={handleEdit} style={{ width: '100%' }}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleDelete} style={{ width: '100%' }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
};
