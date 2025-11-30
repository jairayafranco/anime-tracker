import { Accordion, List, Text } from '@mantine/core';

export default function AnimeDataAccordion({ anime }) {
    if (!anime) return null;

    const safeArray = (arr) => Array.isArray(arr) ? arr : [];
    const safeString = (str) => str || 'N/A';

    return (
        <Accordion mt="md">
            <Accordion.Item value="alternative">
                <Accordion.Control>Alternative Titles</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        {safeArray(anime.title_synonyms).length > 0 && (
                            <List.Item>
                                Synonyms: {anime.title_synonyms.join(', ')}
                            </List.Item>
                        )}
                        {safeArray(anime.titles)
                            .filter(title => title?.type !== "Synonym")
                            .map((title, index) => (
                                <List.Item key={index}>
                                    {title?.type}: {title?.title || 'N/A'}
                                </List.Item>
                            ))
                        }
                        {safeArray(anime.title_synonyms).length === 0 && 
                         safeArray(anime.titles).length === 0 && (
                            <Text c="dimmed">No alternative titles available.</Text>
                        )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="information">
                <Accordion.Control>Information</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        <List.Item>Type: {safeString(anime.type)}</List.Item>
                        <List.Item>Episodes: {anime.episodes || 'N/A'}</List.Item>
                        <List.Item>Duration: {safeString(anime.duration)}</List.Item>
                        <List.Item>Rating: {safeString(anime.rating)}</List.Item>
                        <List.Item>Season: {safeString(anime.season)}</List.Item>
                        <List.Item>Year: {anime.year || 'N/A'}</List.Item>
                        {safeArray(anime.genres).length > 0 && (
                            <List.Item>
                                Genres: {anime.genres.map(genre => genre?.name).filter(Boolean).join(', ')}
                            </List.Item>
                        )}
                        {safeArray(anime.studios).length > 0 && (
                            <List.Item>
                                Studios: {anime.studios.map(studio => studio?.name).filter(Boolean).join(', ')}
                            </List.Item>
                        )}
                        <List.Item>Source: {safeString(anime.source)}</List.Item>
                        {safeArray(anime.producers).length > 0 && (
                            <List.Item>
                                Producers: {anime.producers.map(producer => producer?.name).filter(Boolean).join(', ')}
                            </List.Item>
                        )}
                        {safeArray(anime.licensors).length > 0 && (
                            <List.Item>
                                Licensors: {anime.licensors.map(licensor => licensor?.name).filter(Boolean).join(', ')}
                            </List.Item>
                        )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="statistics">
                <Accordion.Control>Statistics</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        {anime.score && <List.Item>Score: {anime.score}</List.Item>}
                        {anime.rank && <List.Item>Rank: #{anime.rank}</List.Item>}
                        {anime.popularity && <List.Item>Popularity: #{anime.popularity}</List.Item>}
                        {anime.members && <List.Item>Members: {anime.members.toLocaleString()}</List.Item>}
                        {anime.favorites && <List.Item>Favorites: {anime.favorites.toLocaleString()}</List.Item>}
                        {!anime.score && !anime.rank && !anime.popularity && !anime.members && !anime.favorites && (
                            <Text c="dimmed">No statistics available.</Text>
                        )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}