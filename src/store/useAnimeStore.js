import { create } from 'zustand';

const useAnimeStore = create((set) => ({
    animes: [],
    setAnimes: (animes) => set({ 
        animes: Array.isArray(animes) ? animes : [] 
    }),
    clearAnimes: () => set({ animes: [] }),
}));

export default useAnimeStore;