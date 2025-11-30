import { AppShell, MantineProvider, localStorageColorSchemeManager, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import AppBar from './components/Appbar';
import AnimeTabs from './components/Tabs';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'mantine-color-scheme' });

function AppContent() {
  const { colorScheme } = useMantineColorScheme();
  
  useEffect(() => {
    // Actualizar el color de fondo del body y html cuando cambie el color scheme
    const bgColor = colorScheme === 'dark' ? '#1a1b1e' : '#f8f9fa';
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
    document.documentElement.setAttribute('data-mantine-color-scheme', colorScheme);
  }, [colorScheme]);
  
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      styles={(theme) => ({
        header: { padding: '0.5rem' },
        main: { 
          backgroundColor: colorScheme === 'dark' 
            ? '#1a1b1e' 
            : '#f8f9fa',
          minHeight: '100vh'
        },
      })}
    >
      <AppShell.Header>
        <AppBar />
      </AppShell.Header>
      <AppShell.Main>
        <AnimeTabs />
      </AppShell.Main>
    </AppShell>
  );
}

export default function App() {
  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="light"
    >
      <AppContent />
    </MantineProvider>
  );
}