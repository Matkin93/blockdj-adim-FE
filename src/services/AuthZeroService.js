import auth0 from 'auth0-js';
import config from '../config';

export default class AuthZeroService{
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
    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken){
                this.setSession(authResult);
                console.log('I would redirect to home here!!!');
            }else if(err){
                console.log(err);
            }
        })
    }
    setSession = (authResult) => {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        console.log('Set session, redirect to home!!!');
    }
    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.remoteItem('expires_at');
        console.log('Logout, redirect to home!!!');
    }
    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}