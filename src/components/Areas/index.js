import React, { Component } from 'react';
import * as API from '../../utils/api.js';
import AreaList from './List/index'

class Areas extends Component {
    state = {
        areas: []
    }
    render() {
        return (
            <div>
                <AreaList areas={this.state.areas} />
            </div>
        );
    }

    componentDidMount() {
        this.getAreas(this.props.match.params.id);
    }

    getAreas = async (id) => {
        const res = await API.getCityAreas(this.props.match.params.id);
        const areas = res.data;
        this.setState({
            areas: [...this.state.areas, areas]
        })
    }
}

export default Areas;