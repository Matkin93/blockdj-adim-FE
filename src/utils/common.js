import * as jwt_decode from 'jwt-decode';

export const getUser = () => {
    const id_token = localStorage.getItem('id_token');
    return id_token ? jwt_decode(id_token).sub : null;
}
export const getAccessToken = () => {
    const access_token = localStorage.getItem('access_token');
    return access_token ? access_token : null;
}