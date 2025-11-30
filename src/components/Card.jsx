import { Card, Image, Text, Badge, Group } from '@mantine/core';
import AnimeModal from './Modal';

export default function AnimeCard({ anime }) {
    const truncateText = (text, maxLength = 150) => {
        if (!text) return 'No synopsis available.';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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

            <AnimeModal anime={anime} />
        </Card>
    );
}