import { Tabs } from '@mantine/core';
import { IconSearch, IconEye, IconClock, IconHeart, IconX } from '@tabler/icons-react';
import SearchAnime from './Search';
import AnimeCardContainer from './CardContainer';
import AnimesCategoryContainer from './AnimesCategoryContainer';
import { CATEGORIES } from '../utils/helpers';

export default function AnimeTabs() {
    return (
        <Tabs keepMounted={false} defaultValue="search">
            <Tabs.List justify="center">
                <Tabs.Tab value="search" icon={<IconSearch size="0.8rem" />}>Search Anime</Tabs.Tab>
                <Tabs.Tab value="watched" icon={<IconEye size="0.8rem" />}>Watched</Tabs.Tab>
                <Tabs.Tab value="toWatch" icon={<IconClock size="0.8rem" />}>To Watch</Tabs.Tab>
                <Tabs.Tab value="favorites" icon={<IconHeart size="0.8rem" />}>Favorites</Tabs.Tab>
                <Tabs.Tab value="discarded" icon={<IconX size="0.8rem" />}>Discarded</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="search" pt="xs">
                <SearchAnime />
                <AnimeCardContainer />
            </Tabs.Panel>

            <Tabs.Panel value="watched" pt="xs">
                <AnimesCategoryContainer category={CATEGORIES.WATCHED} />
            </Tabs.Panel>

            <Tabs.Panel value="toWatch" pt="xs">
                <AnimesCategoryContainer category={CATEGORIES.TO_WATCH} />
            </Tabs.Panel>

            <Tabs.Panel value="favorites" pt="xs">
                <AnimesCategoryContainer category={CATEGORIES.FAVORITES} />
            </Tabs.Panel>

            <Tabs.Panel value="discarded" pt="xs">
                <AnimesCategoryContainer category={CATEGORIES.DISCARDED} />
            </Tabs.Panel>
        </Tabs>
    );
}