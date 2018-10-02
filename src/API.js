const DB_URL = `backendAdminApiAddress`;
const axios = require('axios');

export const getAreaById = (areaId) => axios.get(`${DB_URL}/areas/${areaId}`)

export const updatedAreaById = (areaId, data) => axios.put(`${DB_URL}/${areaId}`, {
    // 'Data' being whichever elements of the area are to be updated, eg img_url 
    data
})

export const getAllCities = () => axios.get(`${DB_URL}/cities`)

export const addCity = (city) => axios.post(`${DB_URL}/cities`, {
    // City will be a an object eg {"name": "manchester"}
    city
})

export const getCityById = (cityId) => axios.get(`${DB_URL}/cities/${cityId}`)

export const updateCityById = (cityId, data) => axios.put(`${DB_URL}/cities/${cityId}`, {
    //eg {"name": "Manchester" }
    data
})

export const getAreasByCityId = (cityId) => axios.get(`${DB_URL}/cities/${cityId}/areas`)

export const createAreaInCity = (cityId) => axios.post(`${DB_URL}/cities/${cityId}/areas`)
