import auth0 from 'auth0-js';
import config from '../config';
export default class Auth{
    auth0 = new auth0.WebAuth({
        domain: config.domain,
        clientID: config.clientID,
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    })

    login = () => {
        this.auth0.authorize();
    }
}