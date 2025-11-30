import { Container, Pagination, Text } from '@mantine/core';
import { useEffect, useState, useMemo } from 'react';
import AnimeCard from "./Card";
import useAnimeStore from '../store/useAnimeStore';

export default function AnimeCardContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;
    const animes = useAnimeStore(state => state.animes);

    const totalPages = useMemo(() => {
        return Math.ceil((animes?.length || 0) / cardsPerPage);
    }, [animes]);

    const animesFound = useMemo(() => {
        if (!animes || animes.length === 0) return [];
        const startIndex = (currentPage - 1) * cardsPerPage;
        return animes.slice(startIndex, startIndex + cardsPerPage);
    }, [animes, currentPage, cardsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [animes]);

    const handlePagination = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {animesFound.length > 0 ? (
                <Container size="xl" mt="md" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1rem',
                    alignItems: 'start'
                }}>
                    {animesFound.map((anime) => (
                        <AnimeCard key={anime.mal_id || anime.title} anime={anime} />
                    ))}
                </Container>
            ) : (
                <Container size="xl" mt="md">
                    <Text ta="center" c="dimmed" mt="xl" style={{ width: '100%', display: 'block' }}>
                        No animes found. Try searching for something different.
                    </Text>
                </Container>
            )}
            {totalPages > 1 && (
                <Pagination 
                    total={totalPages} 
                    value={currentPage}
                    mt="md" 
                    style={{ display: 'flex', justifyContent: 'center' }} 
                    onChange={handlePagination} 
                />
            )}
        </>
    );
}