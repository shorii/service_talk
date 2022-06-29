import * as React from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
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
    const claims: UserClaims = jwt_decode(document.cookie);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AppBar>
                <AccountCircleIcon />
                <Typography>{claims.sub}</Typography>
            </AppBar>
            {children}
        </>
    );
};
