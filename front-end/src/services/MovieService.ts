import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

export const listAll = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const listbyName = async function (name) {
    const encodedName = encodeURIComponent(name);
    const response= await axios.get(`${API_URL}/search?name=${encodedName}`);
    return response.data;
};


export const listbyTags = async function (tags: string[]) {
    const tagParam = encodeURIComponent(tags[0]);
    const response = await axios.get(`${API_URL}/search-by-tags?tags=${tagParam}`);
    return response.data;
};