import { create } from 'zustand';

const useAnimeStore = create((set) => ({
    animes: [],
    setAnimes: (animes) => set({ animes }),
}));

export default useAnimeStore;