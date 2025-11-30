import { Container, Button, Group } from "@mantine/core";
import { IconEye, IconClock, IconHeart, IconX } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import AnimeDataAccordion from "./Accordion";
import { getAnimeCategory, addAnimeToCategory, removeAnimeFromAllCategories, getTrailerUrl, CATEGORIES } from "../utils/helpers";

export default function ModalContent({ anime }) {
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        if (anime?.mal_id) {
            setCurrentCategory(getAnimeCategory(anime.mal_id));
        }
    }, [anime?.mal_id]);

    const handleCategoryChange = (category) => {
        if (!anime?.mal_id) return;

        if (currentCategory === category) {
            // Si ya está en esa categoría, removerla
            removeAnimeFromAllCategories(anime.mal_id);
            setCurrentCategory(null);
        } else {
            // Agregar a la nueva categoría (esto automáticamente remueve de otras)
            addAnimeToCategory(anime, category);
            setCurrentCategory(category);
        }
        
        // Disparar evento para actualizar los contenedores
        window.dispatchEvent(new CustomEvent('animeCategoryChanged'));
    };

    const trailerUrl = getTrailerUrl(anime);

    return (
        <>
            <Container size="xl" mt="md">

                <Group justify="flex-start" my="md" gap="xs">
                    <Button 
                        onClick={() => handleCategoryChange(CATEGORIES.WATCHED)}
                        variant={currentCategory === CATEGORIES.WATCHED ? "filled" : "light"}
                        color={currentCategory === CATEGORIES.WATCHED ? "blue" : "gray"}
                    >
                        <IconEye size="1rem" style={{ marginRight: '0.5rem' }} />
                        {currentCategory === CATEGORIES.WATCHED ? 'Watched' : 'Mark as Watched'}
                    </Button>
                    <Button 
                        onClick={() => handleCategoryChange(CATEGORIES.TO_WATCH)}
                        variant={currentCategory === CATEGORIES.TO_WATCH ? "filled" : "light"}
                        color={currentCategory === CATEGORIES.TO_WATCH ? "blue" : "gray"}
                    >
                        <IconClock size="1rem" style={{ marginRight: '0.5rem' }} />
                        {currentCategory === CATEGORIES.TO_WATCH ? 'To Watch' : 'Mark as To Watch'}
                    </Button>
                    <Button 
                        onClick={() => handleCategoryChange(CATEGORIES.FAVORITES)}
                        variant={currentCategory === CATEGORIES.FAVORITES ? "filled" : "light"}
                        color={currentCategory === CATEGORIES.FAVORITES ? "pink" : "gray"}
                    >
                        <IconHeart size="1rem" style={{ marginRight: '0.5rem' }} />
                        {currentCategory === CATEGORIES.FAVORITES ? 'Favorite' : 'Add to Favorites'}
                    </Button>
                    <Button 
                        onClick={() => handleCategoryChange(CATEGORIES.DISCARDED)}
                        variant={currentCategory === CATEGORIES.DISCARDED ? "filled" : "light"}
                        color={currentCategory === CATEGORIES.DISCARDED ? "red" : "gray"}
                    >
                        <IconX size="1rem" style={{ marginRight: '0.5rem' }} />
                        {currentCategory === CATEGORIES.DISCARDED ? 'Discarded' : 'Discard'}
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
