import axios from 'axios';
import { getAccessToken } from '../utils/common';

// const API_URL = 'http://localhost:9090/api';
const API_URL = 'https://vast-hamlet-11789.herokuapp.com/api';

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

export const getArea = async (id) => {
    return axios.get(`${API_URL}/areas/${id}`);
}

export const addArea = (id, data) => {
    return axios.post(`${API_URL}/cities/${id}/areas`, data);
}

export const updateArea = (id, data) => {
    return axios.put(`${API_URL}/areas/${id}`, data)
}