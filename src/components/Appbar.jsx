import { Flex } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { Tooltip } from '@mantine/core';
import AnimeLogo from '../images/anime.png'
import { useMantineColorScheme } from '@mantine/core';

export default function AppBar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Flex
            align="center"
            justify="space-between"
            style={{ height: '100%' }}
        >
            <Flex align="center">
                <img
                    src={AnimeLogo}
                    alt="Mantine logo"
                    style={{ height: 50, marginRight: 10 }}
                />
                <h1 style={{ margin: 0, fontSize: 24 }}>Anime Tracker</h1>
            </Flex>
            <Flex align="center">
                <Tooltip label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} theme`} position="left">
                    <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
                        {
                            colorScheme === 'light'
                                ? <IconMoonStars size="1.1rem" />
                                : <IconSun size="1.1rem" />
                        }
                    </ActionIcon>
                </Tooltip>
            </Flex>
        </Flex>
    );
}