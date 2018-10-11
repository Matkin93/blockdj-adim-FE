import React, {Fragment} from 'react';

import Header from '../Header';

const Layout = (props) => {
    return (
        <Fragment>
            <Header {...props}/>
            {props.children}
        </Fragment>
    );
};

export default Layout;