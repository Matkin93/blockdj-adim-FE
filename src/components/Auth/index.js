import React from 'react';
import PropTypes from 'prop-types';

const Auth = props => {
    const {isAuthenticated, login, children} = props;
    if (isAuthenticated()) return children
    else return (
        <button onClick={() => login()}>Login</button>
    )
}

Auth.propTypes = {
    isAuthenticated: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
}

export default Auth;