import { Container, Card, Group, Badge, Spoiler, Button, Image, Text } from '@mantine/core';
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

    return (
        <>
            <Container size="xl" mt="md" sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gridGap: '1rem'
            }}>
                {
                    animesWatchedList.map((anime, index) => (
                        <Card shadow="sm" padding="lg" radius="md" withBorder >
                            <Card.Section>
                                <Image
                                    src={anime.images.webp.large_image_url}
                                    height={160}
                                    alt={anime.title}
                                />
                            </Card.Section>

                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>{anime.title}</Text>
                            </Group>

                            <Group position="apart" mb="xs">
                                <Badge color="pink" variant="light">
                                    {anime.score}
                                </Badge>
                            </Group>

                            <Spoiler maxHeight={70} showLabel="Show" hideLabel="Hidde">
                                <Text size="sm" color="dimmed">
                                    {anime.synopsis}
                                </Text>
                            </Spoiler>

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
