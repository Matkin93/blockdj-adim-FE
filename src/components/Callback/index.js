import React, { Component } from 'react';

class Callback extends Component {
    render() {
        return (
            <div>
                <p>I am loading....</p>
            </div>
        );
    }
    componentDidMount(){
        const {location, handleAuthentication} = this.props;
        if (/access_token|id_token|error/.test(location.hash)) {
          handleAuthentication(this.props);
        }
    }
}

export default Callback;