import { Container, Button, Group } from "@mantine/core";
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import AnimeDataAccordion from "./Accordion";

export default function ModalContent({ anime }) {
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        const animesWatched = JSON.parse(localStorage.getItem('animesWatched')) || [];
        const searchIfAnimeIsWatched = animesWatched.find((animeWatched) => animeWatched.mal_id === anime.mal_id);

        if (searchIfAnimeIsWatched) {
            setWatched(true);
            return;
        }

        setWatched(false);
    }, []);

    const handleAnimesWatched = (anime) => {
        const animesWatched = JSON.parse(localStorage.getItem('animesWatched')) || [];
        const searchIfAnimeIsWatched = animesWatched.find((animeWatched) => animeWatched.mal_id === anime.mal_id);

        if (searchIfAnimeIsWatched) {
            const index = animesWatched.findIndex((animeWatched) => animeWatched.mal_id === anime.mal_id);
            animesWatched.splice(index, 1);
            localStorage.setItem('animesWatched', JSON.stringify(animesWatched));
            setWatched(!watched);
            return;
        }

        animesWatched.push(anime);
        localStorage.setItem('animesWatched', JSON.stringify(animesWatched));
        setWatched(!watched);
    };

    return (
        <>
            <Container size="xl" mt="md">

                <Group position="left" my="md">
                    <Button onClick={() => handleAnimesWatched(anime)}>
                        {watched ? <IconEye size="1rem" /> : <IconEyeClosed size="1rem" />}
                        {watched ? 'No Watched' : 'Watched'}
                    </Button>
                    <Button onClick={() => window.open(anime.url, "_blank")}>
                        MyAnimeList
                    </Button>
                </Group>

                <Button
                    fullWidth
                    variant="light"
                    color="blue"
                    radius="md"
                    onClick={() => window.open(anime.trailer.url, "_blank")}
                >
                    Watch trailer
                </Button>

                <AnimeDataAccordion anime={anime} />

            </Container>

        </>
    );
}
