import { Card, Image, Text, Badge, Group } from '@mantine/core';
import AnimeModal from './Modal';
import { truncateText, getAnimeImageUrl } from '../utils/helpers';

export default function AnimeCard({ anime }) {
    if (!anime) return null;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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

            <AnimeModal anime={anime} />
        </Card>
    );
}