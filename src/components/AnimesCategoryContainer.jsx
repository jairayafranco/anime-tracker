import { Container, Card, Group, Badge, Button, Image, Text } from '@mantine/core';
import { useEffect, useState, useCallback } from 'react';
import { getAnimesByCategory, removeAnimeFromCategory, truncateText, getAnimeImageUrl, CATEGORIES } from '../utils/helpers';

const categoryLabels = {
    [CATEGORIES.WATCHED]: 'Watched',
    [CATEGORIES.TO_WATCH]: 'To Watch',
    [CATEGORIES.FAVORITES]: 'Favorites',
    [CATEGORIES.DISCARDED]: 'Discarded'
};

const emptyMessages = {
    [CATEGORIES.WATCHED]: "You don't have any animes in your watched list.",
    [CATEGORIES.TO_WATCH]: "You don't have any animes in your to watch list.",
    [CATEGORIES.FAVORITES]: "You don't have any favorite animes.",
    [CATEGORIES.DISCARDED]: "You don't have any discarded animes."
};

export default function AnimesCategoryContainer({ category }) {
    const [animesList, setAnimesList] = useState([]);

    const refreshAnimes = useCallback(() => {
        const animes = getAnimesByCategory(category);
        setAnimesList(animes);
    }, [category]);

    useEffect(() => {
        refreshAnimes();
    }, [refreshAnimes]);

    // Escuchar cambios en localStorage
    useEffect(() => {
        // Escuchar eventos de almacenamiento (cambios desde otras pestañas)
        window.addEventListener('storage', refreshAnimes);
        
        // Escuchar eventos personalizados para cambios locales
        window.addEventListener('animeCategoryChanged', refreshAnimes);
        
        // Polling como respaldo (cada segundo)
        const interval = setInterval(() => {
            refreshAnimes();
        }, 1000);

        return () => {
            window.removeEventListener('storage', refreshAnimes);
            window.removeEventListener('animeCategoryChanged', refreshAnimes);
            clearInterval(interval);
        };
    }, [refreshAnimes]);

    const handleRemove = (anime) => {
        const updatedAnimes = removeAnimeFromCategory(anime.mal_id, category);
        setAnimesList(updatedAnimes);
    };

    return (
        <>
            <Container size="xl" mt="md" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
                alignItems: 'start'
            }}>
                {
                    animesList.map((anime, index) => (
                        <Card key={anime.mal_id || index} shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Card.Section>
                                <Image
                                    src={getAnimeImageUrl(anime)}
                                    height={160}
                                    alt={anime.title || 'Anime'}
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{anime.title || 'No title'}</Text>
                            </Group>

                            {anime.score && (
                                <Group justify="space-between" mb="xs">
                                    <Badge color="pink" variant="light">
                                        {anime.score}
                                    </Badge>
                                </Group>
                            )}

                            <Text 
                                size="sm" 
                                color="dimmed" 
                                style={{ 
                                    lineHeight: 1.6,
                                    flexGrow: 1,
                                    overflow: 'hidden'
                                }}
                            >
                                {truncateText(anime.synopsis)}
                            </Text>

                            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => handleRemove(anime)}>
                                Remove from {categoryLabels[category]}
                            </Button>
                        </Card>
                    ))
                }
            </Container>
            {animesList.length === 0 && (
                <Text ta="center" c="dimmed" mt="xl" style={{ width: '100%', display: 'block' }}>
                    {emptyMessages[category] || "You don't have any animes in this list."}
                </Text>
            )}
        </>
    );
}

