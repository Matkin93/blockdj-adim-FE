import axios from 'axios';
import {getAccessToken} from '../utils/common';

const API_URL = 'http://localhost:9090/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`

export const getCompanies = () => {
    return axios.get(`${API_URL}/companies`);
}