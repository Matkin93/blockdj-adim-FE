import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import MapPage from '../Map/map';
import areas from '../areas.css';
import * as API from '../../../utils/api.js';

class AreaList extends Component {
    state = {
        name: '',
        image_url: '',
        color: '',
        bounds: {
            type: 'polygon',
            coordinates: []
        }

    }
    render() {
        console.log(this.props);
        // Accessing individual areas for the city
        const { areas, id } = this.props;
        console.log(areas)
        const areasObj = areas[0];
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr = areasArr[1];
        return (
            <div>
                <form className="new-area-form">
                    <input id="name" onChange={this.changeValue} value={this.state.name} placeholder="area name"></input>
                    <input id="image_url" onChange={this.changeValue} value={this.state.image_url} placeholder="image url"></input>
                    <input id="color" onChange={this.changeValue} value={this.state.color} placeholder="color"></input>
                    <Button onClick={() => this.submitArea(id)}>Add Area</Button>
                </form>
                <MapPage func={this.getNewCoords} />
                <Table className="areas-table" bordered striped>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Name</th>
                            <th>Colour</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {areasArr && (
                            areasArr.map(area => {
                                return (
                                    <tr key={area._id}>
                                        <td>{area.city}</td>
                                        <td>{area.name}</td>
                                        <td>{area.colour}</td>
                                    </tr>
                                )
                            })
                        )}
                        {areasArr && areasArr.length === 0 && (
                            <tr>
                                <td colSpan="3">No areas currently added</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div >
        );
    }

    changeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getNewCoords = (coords) => {
        this.setState({
            newArea: {
                ...this.state.newArea,
                bounds: {
                    type: 'polygon',
                    coordinates: coords
                }
            }
        })
    }

    submitArea = (id) => {
        API.addArea(id, this.state)
    }
}

export default AreaList;