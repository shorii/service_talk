import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export interface FormProps {
    onSubmit?: (form: any) => void;
    onCancel?: () => void;
}

export const Form = (props: React.PropsWithChildren<FormProps>) => {
    const { onSubmit, onCancel, children } = props;

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item>{children}</Grid>
                <Grid
                    container
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    style={{ paddingTop: 8 }}
                >
                    {onSubmit && (
                        <Grid item>
                            <Button type="submit" variant="outlined">
                                submit
                            </Button>
                        </Grid>
                    )}
                    {onCancel && (
                        <Grid item>
                            <Button onClick={onCancel} variant="outlined">
                                cancel
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
