import React, { Component, Fragment } from 'react';
import { Table, Button, Alert } from 'reactstrap';
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
        },
        flashMessage: {
            visible: false,
            text: '',
            className: ''
        }
    }
    render() {
        // Accessing individual areas for the city
        const { areas, id } = this.props;
        const areasObj = areas[0];
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr = areasArr[1];
        return (
            <div>
                <div className="area-add-div">
                    <form className="new-area-form">
                        <input id="name" onChange={this.changeValue} value={this.state.name} placeholder="area name"></input>
                        <input id="image_url" onChange={this.changeValue} value={this.state.image_url} placeholder="image url"></input>
                        <input id="color" onChange={this.changeValue} value={this.state.color} placeholder="color"></input>
                        <Button className="area-submit" onClick={() => this.submitArea(id)}>Add Area</Button>
                        {this.state.flashMessage.visible ? <Alert color={this.state.flashMessage.className}>{this.state.flashMessage.text}</Alert> : null}
                    </form>
                    <MapPage className="map-div" cityId={id} areas={areasArr} func={this.getNewCoords} />
                </div>
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
                                        <td>{this.props.city}</td>
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
        const name = this.state.name;
        const image_url = this.state.image_url;
        const color = this.state.color;
        const bounds = this.state.bounds;
        const areaObj = {
            name: name,
            image_url: image_url,
            color: color,
            bounds: bounds
        }
        API.addArea(id, areaObj)
            .then(res => {
                this.setState({
                    flashMessage: {
                        visible: true,
                        // text: err.data,
                        className: 'success'
                    }
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    flashMessage: {
                        visible: true,
                        // text: err,
                        className: 'danger'
                    }
                })
            })
    }

    componentDidUpdate() {
        //resetting flash messages
        if (this.state.flashMessage.visible) {
            setTimeout(() => {
                console.log('GO!')
                this.setState({
                    flashMessage: {
                        visible: false
                    }
                })
            }, 2000)
        }
    }
}

export default AreaList;