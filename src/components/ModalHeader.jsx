import { Container, Image, Text, Chip, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getAnimeImageUrl } from "../utils/helpers";

export default function ModalHeader({ anime }) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    if (!anime) return null;
    
    return (
        <>
            <Text
                size="xl"
                fw={500}
                style={{ textTransform: "capitalize" }}
                ta="center"
            >
                {anime.title || 'No title'}
            </Text>
            <Container size="xl" mt="md" style={{
                display: "flex",
                gap: "2em",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
            }}>
                <div style={{
                    width: isMobile ? '250px' : '300px',
                    height: isMobile ? '350px' : '420px',
                    flexShrink: 0,
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <Image
                        src={getAnimeImageUrl(anime)}
                        alt={anime.title || 'Anime'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <Text>
                    {anime.synopsis || 'No synopsis available.'}
                    <Chip.Group>
                        <Group justify="flex-start" mt="md">
                            {anime.score && (
                                <Chip variant="outline" radius="md">
                                    Score - {anime.score}
                                </Chip>
                            )}
                            {anime.rank && (
                                <Chip variant="outline" radius="md">
                                    Rank - #{anime.rank}
                                </Chip>
                            )}
                            {anime.season && (
                                <Chip variant="outline" radius="md">
                                    Season - {anime.season}
                                </Chip>
                            )}
                            {anime.popularity && (
                                <Chip variant="outline" radius="md">
                                    Popularity - #{anime.popularity}
                                </Chip>
                            )}
                        </Group>
                    </Chip.Group>
                </Text>

            </Container>
        </>
    );
}