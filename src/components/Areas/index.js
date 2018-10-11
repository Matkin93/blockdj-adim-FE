import React, { Component } from 'react';
import * as API from '../../utils/api.js';
import AreaList from './List/index'

class Areas extends Component {
    state = {
        city: ''
    }
    render() {
        return (
            <div>
                <AreaList id={this.props.match.params.id} city={this.state.city} />
            </div>
        );
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getCity(id);
    }


    getCity = async (id) => {
        const res = await API.getCity(id);
        if (res.data.city) {
            const cityName = res.data.city.name;
            this.setState({
                city: cityName
            });
        }
    }

}

export default Areas;