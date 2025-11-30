import { Container, Image, Text, Chip, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function ModalHeader({ anime }) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    return (
        <>
            <Text
                size="xl"
                fw={500}
                style={{ textTransform: "capitalize" }}
                ta="center"
            >
                {anime.title}
            </Text>
            <Container size="xl" mt="md" style={{
                display: "flex",
                gap: "2em",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
            }}>
                <Image
                    src={anime.images.webp.large_image_url}
                    width={250}
                    alt={anime.title}
                />
                <Text>
                    {anime.synopsis}
                    <Chip.Group>
                        <Group justify="flex-start" mt="md">
                            <Chip variant="outline" radius="md">
                                Score - {anime.score}
                            </Chip>
                            <Chip variant="outline" radius="md">
                                Rank - #{anime.rank}
                            </Chip>
                            <Chip variant="outline" radius="md">
                                Season - {anime.season}
                            </Chip>
                            <Chip variant="outline" radius="md">
                                Popularity - #{anime.popularity}
                            </Chip>
                        </Group>
                    </Chip.Group>
                </Text>

            </Container>
        </>
    );
}