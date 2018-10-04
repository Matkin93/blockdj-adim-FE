import React, { Component } from 'react';
import * as API from '../../utils/api.js';
import AreaList from './List/index'

class Areas extends Component {
    state = {
        areas: [],
        city: ''
    }
    render() {
        return (
            <div>
                <AreaList id={this.props.match.params.id} city={this.state.city} areas={this.state.areas} />
            </div>
        );
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getCity(id);
        this.getAreas(id);
    }



    getCity = async (id) => {
        const res = await API.getCity(id);
        const cityName = res.data.city.name;
        this.setState({
            city: cityName
        });
    }

    getAreas = async (id) => {
        const res = await API.getCityAreas(id);
        const areas = res.data;
        this.setState({
            areas: [...this.state.areas, areas]
        })
    }
}

export default Areas;