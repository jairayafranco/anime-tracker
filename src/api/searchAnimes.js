import axios from "axios";

export default async function searchAnimes(query) {
    try {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}