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

// Categorías disponibles
export const CATEGORIES = {
    WATCHED: 'watched',
    TO_WATCH: 'toWatch',
    FAVORITES: 'favorites',
    DISCARDED: 'discarded'
};

/**
 * Obtiene los animes de una categoría específica del localStorage
 * @param {string} category - Categoría del anime (watched, toWatch, favorites, discarded)
 * @returns {Array} Array de animes de la categoría
 */
export const getAnimesByCategory = (category) => {
    try {
        const key = `animes${category.charAt(0).toUpperCase() + category.slice(1)}`;
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error(`Error al leer animes de la categoría ${category} del localStorage:`, error);
        return [];
    }
};

/**
 * Guarda los animes de una categoría específica en el localStorage
 * @param {string} category - Categoría del anime
 * @param {Array} animes - Array de animes a guardar
 */
export const saveAnimesByCategory = (category, animes) => {
    try {
        const key = `animes${category.charAt(0).toUpperCase() + category.slice(1)}`;
        localStorage.setItem(key, JSON.stringify(animes));
        // Disparar evento personalizado para notificar cambios
        window.dispatchEvent(new CustomEvent('animeCategoryChanged', { detail: { category } }));
    } catch (error) {
        console.error(`Error al guardar animes de la categoría ${category} en localStorage:`, error);
    }
};

/**
 * Verifica si un anime está en una categoría específica
 * @param {number} malId - ID del anime
 * @param {string} category - Categoría a verificar
 * @returns {boolean} True si está en la categoría
 */
export const isAnimeInCategory = (malId, category) => {
    const animes = getAnimesByCategory(category);
    return animes.some(anime => anime.mal_id === malId);
};

/**
 * Obtiene la categoría actual de un anime (si está en alguna)
 * @param {number} malId - ID del anime
 * @returns {string|null} Categoría del anime o null si no está en ninguna
 */
export const getAnimeCategory = (malId) => {
    for (const category of Object.values(CATEGORIES)) {
        if (isAnimeInCategory(malId, category)) {
            return category;
        }
    }
    return null;
};

/**
 * Agrega un anime a una categoría específica
 * @param {Object} anime - Objeto del anime
 * @param {string} category - Categoría a la que agregar
 */
export const addAnimeToCategory = (anime, category) => {
    // Remover el anime de todas las categorías primero
    removeAnimeFromAllCategories(anime.mal_id);
    
    // Agregar a la nueva categoría
    const animes = getAnimesByCategory(category);
    if (!isAnimeInCategory(anime.mal_id, category)) {
        animes.push(anime);
        saveAnimesByCategory(category, animes);
    }
};

/**
 * Elimina un anime de una categoría específica
 * @param {number} malId - ID del anime a eliminar
 * @param {string} category - Categoría de la que eliminar
 * @returns {Array} Array actualizado de animes
 */
export const removeAnimeFromCategory = (malId, category) => {
    const animes = getAnimesByCategory(category);
    const filteredAnimes = animes.filter(anime => anime.mal_id !== malId);
    saveAnimesByCategory(category, filteredAnimes);
    return filteredAnimes;
};

/**
 * Remueve un anime de todas las categorías
 * @param {number} malId - ID del anime a remover
 */
export const removeAnimeFromAllCategories = (malId) => {
    Object.values(CATEGORIES).forEach(category => {
        removeAnimeFromCategory(malId, category);
    });
};

// Funciones de compatibilidad para mantener la funcionalidad existente
/**
 * @deprecated Usar getAnimesByCategory(CATEGORIES.WATCHED) en su lugar
 */
export const getWatchedAnimes = () => getAnimesByCategory(CATEGORIES.WATCHED);

/**
 * @deprecated Usar saveAnimesByCategory(CATEGORIES.WATCHED, animes) en su lugar
 */
export const saveWatchedAnimes = (animes) => saveAnimesByCategory(CATEGORIES.WATCHED, animes);

/**
 * @deprecated Usar isAnimeInCategory(malId, CATEGORIES.WATCHED) en su lugar
 */
export const isAnimeWatched = (malId) => isAnimeInCategory(malId, CATEGORIES.WATCHED);

/**
 * @deprecated Usar addAnimeToCategory(anime, CATEGORIES.WATCHED) en su lugar
 */
export const addWatchedAnime = (anime) => addAnimeToCategory(anime, CATEGORIES.WATCHED);

/**
 * @deprecated Usar removeAnimeFromCategory(malId, CATEGORIES.WATCHED) en su lugar
 */
export const removeWatchedAnime = (malId) => removeAnimeFromCategory(malId, CATEGORIES.WATCHED);

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

