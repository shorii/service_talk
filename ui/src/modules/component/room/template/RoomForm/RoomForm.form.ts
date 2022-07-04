import { useForm as _useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    name: z.string(),
    description: z.string(),
});

export type RoomFormValues = z.infer<typeof schema>;

export const useForm = (
    onSubmit: SubmitHandler<RoomFormValues>,
    defaultValues?: RoomFormValues,
) => {
    const { handleSubmit: _handleSubmit, ...rest } = _useForm<RoomFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });
    const handleSubmit = _handleSubmit(onSubmit);
    return {
        handleSubmit,
        ...rest,
    };
};
