import * as React from 'react';
import { Form } from '@/modules/component/common';
import { useForm, RoomFormValues } from './RoomForm.form';
import { SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export interface RoomFormProps {
    onSubmit: SubmitHandler<RoomFormValues>;
    onCancel: () => void;
    defaultValues?: RoomFormValues;
}

export const RoomForm: React.FC<RoomFormProps> = (props) => {
    const { defaultValues, onSubmit, onCancel } = props;
    const { handleSubmit, control } = useForm(onSubmit, defaultValues);
    return (
        <Form onSubmit={handleSubmit} onCancel={onCancel}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value, ref } }) => {
                            return (
                                <TextField
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label={'name'}
                                    variant="standard"
                                    data-cy="RoomForm-name"
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, onBlur, value, ref } }) => {
                            return (
                                <TextField
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label={'description'}
                                    variant="standard"
                                    data-cy="RoomForm-description"
                                />
                            );
                        }}
                    />
                </Grid>
            </Grid>
        </Form>
    );
};
