import { Accordion, List } from '@mantine/core';

export default function AnimeDataAccordion({ anime }) {
    return (
        <Accordion mt="md">
            <Accordion.Item value="alternative">
                <Accordion.Control>Alternative Titles</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        <List.Item>Synonyms: {anime.title_synonyms.join(', ')}</List.Item>
                        {
                            anime.titles.filter(title => title.type !== "Synonym").map((title, index) => (
                                <List.Item key={index}>{title.type}: {title.title}</List.Item>
                            ))
                        }
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="information">
                <Accordion.Control>Information</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        <List.Item>Type: {anime.type}</List.Item>
                        <List.Item>Episodes: {anime.episodes}</List.Item>
                        <List.Item>Duration: {anime.duration}</List.Item>
                        <List.Item>Rating: {anime.rating}</List.Item>
                        <List.Item>Season: {anime.season}</List.Item>
                        <List.Item>Year: {anime.year}</List.Item>
                        <List.Item>Genres: {anime.genres.map(genre => genre.name).join(', ')}</List.Item>
                        <List.Item>Studios: {anime.studios.map(studio => studio.name).join(', ')}</List.Item>
                        <List.Item>Source: {anime.source}</List.Item>
                        <List.Item>Producers: {anime.producers.map(producer => producer.name).join(', ')}</List.Item>
                        <List.Item>Licensors: {anime.licensors.map(licensor => licensor.name).join(', ')}</List.Item>
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="statistics">
                <Accordion.Control>Statistics</Accordion.Control>
                <Accordion.Panel>
                    <List>
                        <List.Item>Score: {anime.score}</List.Item>
                        <List.Item>Rank: #{anime.rank}</List.Item>
                        <List.Item>Popularity: #{anime.popularity}</List.Item>
                        <List.Item>Members: {anime.members}</List.Item>
                        <List.Item>Favorites: {anime.favorites}</List.Item>
                    </List>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}