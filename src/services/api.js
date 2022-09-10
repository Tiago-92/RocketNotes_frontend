import axios from "axios";

export const api = axios.create({
    baseURL: 'https://rocketnotes-explorer.herokuapp.com/'
});