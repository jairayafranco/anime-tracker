import axios from "axios";

export default async function searchAnimes(query) {
    try {
        if (!query || query.trim() === '') {
            throw new Error('Search query cannot be empty');
        }
        
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query.trim())}`, {
            timeout: 10000, // 10 seconds timeout
        });
        
        return { success: true, data };
    } catch (error) {
        console.error('Error searching animes:', error);
        
        if (error.response) {
            // Server responded with an error code
            return { 
                success: false, 
                error: `Server error: ${error.response.status}`,
                data: null 
            };
        } else if (error.request) {
            // Request was made but no response received
            return { 
                success: false, 
                error: 'Could not connect to server. Please check your connection.',
                data: null 
            };
        } else {
            // Something else caused the error
            return { 
                success: false, 
                error: error.message || 'An unexpected error occurred',
                data: null 
            };
        }
    }
}