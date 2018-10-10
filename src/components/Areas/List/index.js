import React, { Component } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import MapPage from '../Map/map';
import areas from '../areas.css';
import { Link } from 'react-router-dom';
import * as API from '../../../utils/api.js';
import CityAreas from './CityAreas';

class AreaList extends Component {
    state = {
        areas: [],
        name: '',
        image_url: '',
        colour: '',
        bounds: {
            type: 'Polygon',
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
        const { id } = this.props;
        const { areas } = this.state;
        console.log(areas,'AREAS IN STATE')
        return (
            <div>
                <div className="area-add-div">
                    {this.props.city !== '' ?
                        <form className="new-area-form">
                            < input id="name" onChange={this.changeValue} value={this.state.name} placeholder="area name"></input>
                            <input id="image_url" onChange={this.changeValue} value={this.state.image_url} placeholder="image url"></input>
                            <input id="colour" onChange={this.changeValue} value={this.state.colour} placeholder="colour"></input>
                            <Button className="area-submit" onClick={() => this.submitArea(id)}>Add Area</Button>
                            {this.state.flashMessage.visible ? <Alert color={this.state.flashMessage.className}>{this.state.flashMessage.text}</Alert> : null}
                        </form>
                        : <form className="edit-area-form">
                            < input id="name" onChange={this.changeValue} value={this.state.name} placeholder="area name"></input>
                            <input id="image_url" onChange={this.changeValue} value={this.state.image_url} placeholder="image url"></input>
                            <input id="colour" onChange={this.changeValue} value={this.state.colour} placeholder="colour"></input>
                            <Button className="edit-area" onClick={() => this.editArea(id)}>Edit Area</Button>
                            {this.state.flashMessage.visible ? <Alert color={this.state.flashMessage.className}>{this.state.flashMessage.text}</Alert> : null}
                        </form>}
                    <MapPage className="map-div" cityId={id} city={this.props.city} areas={areas} func={this.getNewCoords} />
                </div>
                {
                    this.props.city !== '' && (
                        <CityAreas areas={areas} id={id} city={this.props.city} />
                    )
                }
            </div >
        );
    }

    getAreaDetails = async (id) => {
        const res = await API.getArea(id)
        console.log(res);
    }

    componentDidMount() {
        this.getAreas(this.props.id);
        let area = {}
        const id = this.props.id;
        if (this.props.city === '') {
            API.getArea(id)
                .then(res => {
                    if (res.data.area) {
                        area = res.data.area;
                        this.setState({
                            name: area.name,
                            image_url: area.image_url,
                            colour: area.colour
                        })
                    }
                }, console.log(area))
        }
    }

    getAreas = async (id) => {
        const res = await API.getCityAreas(id);
        const { areas } = res.data;
        this.setState({
            areas
        })
    }


    changeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getNewCoords = (coords) => {
        this.setState({
            bounds: {
                type: 'Polygon',
                coordinates: coords
            }
        })
    }

    submitArea = (id) => {
        const name = this.state.name;
        const image_url = this.state.image_url;
        const colour = this.state.colour;
        const bounds = this.state.bounds;
        const areaObj = {
            name: name,
            image_url: image_url,
            colour: colour,
            bounds: bounds
        }


        {
            this.state.bounds.coordinates.length > 0 ?
                API.addArea(id, areaObj)
                    .then(res => {
                        const { area } = res.data
                        console.log(res.data.area)
                        this.setState({
                            areas: [...this.state.areas, area],
                            name: '',
                            image_url: '',
                            colour: '',
                            bounds: {
                                type: 'Polygon',
                                coordinates: []
                            },
                            flashMessage: {
                                visible: true,
                                text: (areaObj.name + ' added successfully'),
                                className: 'success'
                            }
                        })
                    })
                    .catch(err => {
                        this.setState({
                            flashMessage: {
                                visible: true,
                                // text: err,
                                className: 'danger'
                            }
                        })
                    })
                : this.setState({
                    flashMessage: {
                        visible: true,
                        text: 'Please add area co-ordinates using the map',
                        className: 'danger'
                    }
                })
        }

    }

    componentDidUpdate() {
        //resetting flash messages
        if (this.state.flashMessage.visible) {
            setTimeout(() => {
                this.setState({
                    flashMessage: {
                        visible: false
                    }
                })
            }, 2000)
        }
    }

    editArea = (id) => {
        const name = this.state.name;
        const image_url = this.state.image_url;
        const colour = this.state.colour;
        const bounds = this.state.bounds;
        const areaObj = {
            name: name,
            image_url: image_url,
            colour: colour,
            bounds: bounds
        }
        {
            API.updateArea(id, areaObj)
                .then(res => {
                    console.log(res);
                    this.setState({
                        flashMessage: {
                            visible: true,
                            text: (areaObj.name + ' updated successfully'),
                            className: 'success'
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        flashMessage: {
                            visible: true,
                            text: 'Please check all fields',
                            className: 'danger'
                        }
                    })
                })
        }
    }
}

export default AreaList;