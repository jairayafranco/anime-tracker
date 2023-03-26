import { TextInput, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import searchAnimes from '../api/searchAnimes';

export default function SearchAnime({ setAnimes }) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (animeName) => {
                if (!animeName) return 'Anime name is required';
            }
        }
    });

    const getAnimes = async (values) => {
        setLoading(true);
        const { data } = await searchAnimes(values.name);
        setAnimes(data);
        setLoading(false);
    };

    return (
        <Box maw={800} mt={12} mx="auto">
            <form onSubmit={form.onSubmit(getAnimes)}>
                <TextInput
                    placeholder="Anime name..."
                    disabled={loading}
                    {...form.getInputProps('name')}
                />
                <Button mt={5} type="submit" loading={loading}>Search</Button>
            </form>
        </Box>
    );
}