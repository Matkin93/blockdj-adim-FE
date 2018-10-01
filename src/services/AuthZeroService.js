import auth0 from 'auth0-js';
import config from '../config';

export default class AuthZeroService{
    auth0 = new auth0.WebAuth({
        domain: config.domain,
        clientID: config.clientID,
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });
    login = () => {
        this.auth0.authorize();
    }
    handleAuthentication = (props) => {
        const {history} = props;        
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken){
                this.setSession(authResult, props);
                history.push('/')
            }else if(err){
                console.log(err);
            }
        })
    }
    setSession = (authResult, props) => {
        const {history} = props;        
        const expires = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expires);
        history.push('/');
    }
    logout = (props) => {
        const {history} = props;
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        history.push('/')
    }
    isAuthenticated = () => {
        const expires = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expires;
    }
}