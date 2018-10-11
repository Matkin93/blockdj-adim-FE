import React from 'react';

const Unauthorised = (props) => {
    return (
        <div>
            <p>Unauthorised</p>
            <p>You are unauthorised. Please click the button below to try again</p>
            <p><button onClick={() => props.logout()}>Logout</button></p>
        </div>
    );
};

export default Unauthorised;