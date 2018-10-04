import axios from 'axios';
import { getAccessToken } from '../utils/common';

const API_URL = 'http://localhost:9090/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`

export const getCities = () => {
    return axios.get(`${API_URL}/cities`);
}

export const addCity = (data) => {
    return axios.post(`${API_URL}/cities`, data);
}

export const getCity = (id) => {
    return axios.get(`${API_URL}/cities/${id}`);
}

export const getCityAreas = async (id) => {
    return axios.get(`${API_URL}/cities/${id}/areas`);
}