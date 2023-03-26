import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import ModalHeader from './ModalHeader';
import ModalContet from './ModalContent';

export default function AnimeModal({ anime }) {
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                fullScreen
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <ModalHeader anime={anime} />
                <ModalContet anime={anime} />
            </Modal>

            <Group position="center">
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={open}>
                    More info
                </Button>
            </Group>
        </>
    );
}