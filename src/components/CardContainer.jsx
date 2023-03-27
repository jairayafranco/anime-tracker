import { Container, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';
import AnimeCard from "./Card";
import useAnimeStore from '../store/useAnimeStore';

export default function AnimeCardContainer() {
    const [animesFound, setAnimesFound] = useState([]);
    const cardsPerPage = 8;
    const animes = useAnimeStore(state => state.animes);

    useEffect(() => {
        setAnimesFound(animes.slice(0, cardsPerPage));
    }, [animes]);

    const handlePagination = (page) => {
        setAnimesFound(animes.slice((page - 1) * cardsPerPage, page * cardsPerPage));
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Container size="xl" mt="md" sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gridGap: '1rem'
            }}>
                {
                    animesFound.map((anime, index) => (
                        <AnimeCard key={index} anime={anime} />
                    ))
                }
            </Container>
            <Pagination total={Math.ceil(animes.length / cardsPerPage)} mt="md" sx={{ display: 'flex', justifyContent: 'center', }} onChange={handlePagination} />
        </>
    );
}