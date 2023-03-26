import { Container, Image, Text, Chip, Group } from "@mantine/core";

export default function ModalHeader({ anime }) {
    return (
        <>
            <Text
                size="xl"
                weight={500}
                style={{ textTransform: "capitalize" }}
                ta="center"
            >
                {anime.title}
            </Text>
            <Container size="xl" mt="md" sx={{
                display: "flex",
                gap: "2em",
                '@media (max-width: 768px)': {
                    flexDirection: "column",
                    alignItems: "center",
                },
            }}>
                <Image
                    src={anime.images.webp.large_image_url}
                    width={250}
                    alt={anime.title}
                />
                <Text>
                    {anime.synopsis}
                    <Chip.Group>
                        <Group position="left" mt="md">
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