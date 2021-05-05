import axios from 'axios';
import { getWithExpiry } from './components/navBar/LocalStorage';

export const userDetailAxios = () => {
    let token;

    if (getWithExpiry('token')) {
        token = getWithExpiry('token');
    }
    return axios.create({
        baseURL: 'http://localhost:5500',
        timeout: 5000,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const bibleAxios = axios.create({
    baseURL: 'https://api.scripture.api.bible/v1/bibles',
    timeout: 5000,
    headers: {
        'api-key': '98ed5d9091d3de1879547e65eb38b729',
    },
});
