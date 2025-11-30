import { TextInput, Button, Box, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import searchAnimes from '../api/searchAnimes';
import useAnimeStore from '../store/useAnimeStore';

export default function SearchAnime() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setAnimesStore = useAnimeStore(state => state.setAnimes);

    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (animeName) => {
                if (!animeName || animeName.trim() === '') {
                    return 'Anime name is required';
                }
                return null;
            }
        }
    });

    const getAnimes = async (values) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await searchAnimes(values.name);
            
            if (result.success && result.data) {
                // La API devuelve { data: { data: [...] } }, necesitamos acceder a data.data
                const animesArray = result.data.data || result.data || [];
                setAnimesStore(Array.isArray(animesArray) ? animesArray : []);
            } else {
                setError(result.error || 'Could not fetch animes');
                setAnimesStore([]);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setAnimesStore([]);
        } finally {
            setLoading(false);
        }
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
            {error && (
                <Alert 
                    icon={<IconAlertCircle size="1rem" />} 
                    title="Error" 
                    color="red" 
                    mt="md"
                >
                    {error}
                </Alert>
            )}
        </Box>
    );
}