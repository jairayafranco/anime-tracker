import { Container, Button, Group } from "@mantine/core";
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import AnimeDataAccordion from "./Accordion";
import { isAnimeWatched, addWatchedAnime, removeWatchedAnime, getTrailerUrl } from "../utils/helpers";

export default function ModalContent({ anime }) {
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        if (anime?.mal_id) {
            setWatched(isAnimeWatched(anime.mal_id));
        }
    }, [anime?.mal_id]);

    const handleAnimesWatched = () => {
        if (!anime?.mal_id) return;

        if (watched) {
            removeWatchedAnime(anime.mal_id);
        } else {
            addWatchedAnime(anime);
        }
        setWatched(!watched);
    };

    const trailerUrl = getTrailerUrl(anime);

    return (
        <>
            <Container size="xl" mt="md">

                <Group justify="flex-start" my="md">
                    <Button onClick={handleAnimesWatched}>
                        {watched ? <IconEye size="1rem" /> : <IconEyeClosed size="1rem" />}
                        {watched ? 'Mark as Not Watched' : 'Mark as Watched'}
                    </Button>
                    {anime?.url && (
                        <Button onClick={() => window.open(anime.url, "_blank")}>
                            MyAnimeList
                        </Button>
                    )}
                </Group>

                {trailerUrl && (
                    <Button
                        fullWidth
                        variant="light"
                        color="blue"
                        radius="md"
                        onClick={() => window.open(trailerUrl, "_blank")}
                    >
                        Watch Trailer
                    </Button>
                )}

                <AnimeDataAccordion anime={anime} />

            </Container>

        </>
    );
}
