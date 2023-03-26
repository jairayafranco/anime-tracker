import { Card, Image, Text, Badge, Group, Spoiler } from '@mantine/core';
import AnimeModal from './Modal';

export default function AnimeCard({ anime }) {
    return (
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

            <AnimeModal anime={anime} />
        </Card>
    );
}