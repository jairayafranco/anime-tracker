/**
 * Trunca un texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 150) => {
    if (!text) return 'No synopsis available.';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Obtiene los animes vistos del localStorage
 * @returns {Array} Array de animes vistos
 */
export const getWatchedAnimes = () => {
    try {
        return JSON.parse(localStorage.getItem('animesWatched')) || [];
    } catch (error) {
        console.error('Error al leer animes vistos del localStorage:', error);
        return [];
    }
};

/**
 * Guarda los animes vistos en el localStorage
 * @param {Array} animes - Array de animes a guardar
 */
export const saveWatchedAnimes = (animes) => {
    try {
        localStorage.setItem('animesWatched', JSON.stringify(animes));
    } catch (error) {
        console.error('Error al guardar animes vistos en localStorage:', error);
    }
};

/**
 * Verifica si un anime está en la lista de vistos
 * @param {number} malId - ID del anime
 * @returns {boolean} True si está en la lista
 */
export const isAnimeWatched = (malId) => {
    const watchedAnimes = getWatchedAnimes();
    return watchedAnimes.some(anime => anime.mal_id === malId);
};

/**
 * Agrega un anime a la lista de vistos
 * @param {Object} anime - Objeto del anime
 */
export const addWatchedAnime = (anime) => {
    const watchedAnimes = getWatchedAnimes();
    if (!isAnimeWatched(anime.mal_id)) {
        watchedAnimes.push(anime);
        saveWatchedAnimes(watchedAnimes);
    }
};

/**
 * Elimina un anime de la lista de vistos
 * @param {number} malId - ID del anime a eliminar
 */
export const removeWatchedAnime = (malId) => {
    const watchedAnimes = getWatchedAnimes();
    const filteredAnimes = watchedAnimes.filter(anime => anime.mal_id !== malId);
    saveWatchedAnimes(filteredAnimes);
    return filteredAnimes;
};

/**
 * Obtiene la URL de la imagen del anime de forma segura
 * @param {Object} anime - Objeto del anime
 * @returns {string} URL de la imagen o placeholder
 */
export const getAnimeImageUrl = (anime) => {
    return anime?.images?.webp?.large_image_url 
        || anime?.images?.jpg?.large_image_url 
        || 'https://via.placeholder.com/300x400?text=No+Image';
};

/**
 * Obtiene la URL del trailer de forma segura
 * @param {Object} anime - Objeto del anime
 * @returns {string|null} URL del trailer o null
 */
export const getTrailerUrl = (anime) => {
    return anime?.trailer?.url || null;
};

