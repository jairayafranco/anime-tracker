import { Container, Card, Group, Badge, Button, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getWatchedAnimes, removeWatchedAnime, truncateText, getAnimeImageUrl } from '../utils/helpers';

export default function AnimesWatchedContainer() {
    const [animesWatchedList, setAnimesWatchedList] = useState([]);

    useEffect(() => {
        const animes = getWatchedAnimes();
        setAnimesWatchedList(animes);
    }, []);

    const handleRemove = (anime) => {
        const updatedAnimes = removeWatchedAnime(anime.mal_id);
        setAnimesWatchedList(updatedAnimes);
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
                    animesWatchedList.map((anime, index) => (
                        <Card key={anime.mal_id || index} shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Card.Section>
                                <Image
                                    src={getAnimeImageUrl(anime)}
                                    height={160}
                                    alt={anime.title || 'Anime'}
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{anime.title || 'Sin título'}</Text>
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
                                Remove from List
                            </Button>
                        </Card>
                    ))
                }
            </Container>
            {animesWatchedList.length === 0 && (
                <Text ta="center" c="dimmed" mt="xl" style={{ width: '100%', display: 'block' }}>
                    You don't have any animes in your watched list.
                </Text>
            )}
        </>
    );
}
