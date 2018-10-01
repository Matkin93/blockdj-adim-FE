import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

const Auth = props => {
    const {isAuthenticated, children} = props;
    if (!isAuthenticated()) return <Redirect to="/login"/>
    else return children
}

Auth.propTypes = {
    isAuthenticated: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
}

export default Auth;