import React from 'react';

const index = (props) => {
    const {login} = props;
    console.log(props);
    return login();
};

export default index;