import axios from 'axios';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const nodeApiConfig = () => {
    // Headers
    axios.defaults.baseURL = process.env.API_URL;
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: token ? `bearer ${token}` : undefined,
        },
    };

    return config;
};

export const nodeFetcher = async (url: string) => {
    try {
        const header = nodeApiConfig();
        const res = await axios.get(url, header);
        return res.data;
    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const zerionApiConfig = () => {
    // Headers
    axios.defaults.baseURL = process.env.ZERION_API_URL;
    const config = {
        headers: {
            accept: 'application/json',
            authorization: `Basic ${process.env.ZERION_API_KEY}`,
        },
    };

    return config;
};

export const zerionFetcher = async (url: string) => {
    try {
        const header = zerionApiConfig();
        const res = await axios.get(url, header);
        return res.data;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
