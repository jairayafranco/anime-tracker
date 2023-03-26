import { Tabs } from '@mantine/core';
import { IconSearch, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import SearchAnime from './Search';
import AnimeCardContainer from './CardContainer';
import AnimesWatchedContainer from './AnimesWatchedContainer';

export default function AnimeTabs() {
    const [animes, setAnimes] = useState([]);

    return (
        <Tabs keepMounted={false} defaultValue="search">
            <Tabs.List position="center">
                <Tabs.Tab value="search" icon={<IconSearch size="0.8rem" />}>Search Anime</Tabs.Tab>
                <Tabs.Tab value="watched" icon={<IconEye size="0.8rem" />}>Animes Watched</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="search" pt="xs">
                <SearchAnime setAnimes={setAnimes} />
                <AnimeCardContainer animes={animes} />
            </Tabs.Panel>

            <Tabs.Panel value="watched" pt="xs">
                <AnimesWatchedContainer />
            </Tabs.Panel>
        </Tabs>
    );
}