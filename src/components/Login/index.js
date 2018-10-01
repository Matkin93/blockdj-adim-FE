import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
    const {login} = props;
    return login();
};

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default Login;