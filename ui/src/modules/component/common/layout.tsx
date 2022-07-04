import * as React from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwt_decode from 'jwt-decode';

export interface UserClaims {
    iss: string;
    sub: string;
    exp: string;
}

export interface LayoutProps {
    title: string;
}

export const Layout = (props: React.PropsWithChildren<LayoutProps>) => {
    const { title, children } = props;
    //const claims: UserClaims = jwt_decode(document.cookie);
    const claims: UserClaims = {
        iss: 'service_auth.api',
        sub: 'Guest',
        exp: 'exp',
    };

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AppBar position="fixed">
                <Stack direction="row" alignItems="center" gap={1}>
                    <AccountCircleIcon />
                    <Typography variant="h6">{claims.sub}</Typography>
                </Stack>
            </AppBar>
            {children}
        </>
    );
};
