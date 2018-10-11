import auth0 from 'auth0-js';
import config from PROCESS.ENV ? PROCESS.ENV :'../config.js';

export default class AuthZeroService {
    auth0 = new auth0.WebAuth({
        domain: config.domain,
        clientID: config.clientID,
        redirectUri: config.callbackUri,
        responseType: config.responseType,
        audience: config.audience,
        scope: config.scope,
    });
    login = () => {
        this.auth0.authorize();
    }
    handleAuthentication = (props) => {
        const { history } = props;
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, props);
                history.replace('/')
            } else if (err) {
                console.log(err);
                history.replace('/unauthorised');
            }
        })
    }
    setSession = (authResult, props) => {
        const { history } = props;
        const expires = JSON.stringify((authResult.expiresIn * config.authTokenTimeout) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expires);
        history.replace('/');
    }
    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        window.location.href = config.logoutUri;
    }
    isAuthenticated = () => {
        const expires = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expires;
    }
}