import { Container, Card, Group, Badge, Button, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function AnimesWatchedContainer() {
    const [animesWatchedList, setAnimesWatchedList] = useState([]);

    useEffect(() => {
        const getLocalStoragedAnimes = JSON.parse(localStorage.getItem('animesWatched')) || [];
        setAnimesWatchedList(getLocalStoragedAnimes);
    }, []);

    const handleRemove = (anime) => {
        const animesWatched = JSON.parse(localStorage.getItem('animesWatched')) || [];
        const index = animesWatched.findIndex((animeWatched) => animeWatched.mal_id === anime.mal_id);
        animesWatched.splice(index, 1);
        localStorage.setItem('animesWatched', JSON.stringify(animesWatched));
        setAnimesWatchedList(animesWatched);
    };

    const truncateText = (text, maxLength = 150) => {
        if (!text) return 'No synopsis available.';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
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
                                    src={anime.images.webp.large_image_url}
                                    height={160}
                                    alt={anime.title}
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{anime.title}</Text>
                            </Group>

                            <Group justify="space-between" mb="xs">
                                <Badge color="pink" variant="light">
                                    {anime.score}
                                </Badge>
                            </Group>

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
                                Remove from list
                            </Button>
                        </Card>
                    ))
                }
            </Container>
        </>
    );
}
