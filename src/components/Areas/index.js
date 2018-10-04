import React, { Component, Fragment } from 'react';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import EditControl from '../Leaflet/EditControl';

import produce from 'immer';

import * as api from '../../utils/api';

class Areas extends Component {
    state = {
        city: false,
        areas: false
    }
    render() {
        const {city, areas} = this.state;
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>                
                            <Card style={{marginBottom:'1rem', backgroundColor:'#e9ecef'}}>
                                <CardBody>     
                                    <p style={{marginBottom:'0'}}>Areas / Districts: <strong>{city.name}</strong></p>    
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody style={{padding:'0'}}>
                                    <Map className="map-div" center={[53.4808, -2.2426]} zoom={13} zoomControl={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                        />
                                        <FeatureGroup ref={(reactFGref) => { this._onFeatureGroupReady(reactFGref); }}>
                                            <EditControl
                                                position='topright'
                                                draw={{
                                                    rectangle:false,
                                                    polygon:true,
                                                    polyline:false,
                                                    circle:false,
                                                    marker:false,
                                                    circlemarker:false
                                                }}
                                                onEdited={this._onEdited}
                                                onCreated={this._onCreated}
                                                onDeleted={this._onDeleted}
                                                onMounted={this._onMounted}
                                                onEditStart={this._onEditStart}
                                                onEditStop={this._onEditStop}
                                                onDeleteStart={this._onDeleteStart}
                                                onDeleteStop={this._onDeleteStop}
                                            />
                                        </FeatureGroup>
                                    </Map>                                    
                                    {areas && areas.map(area => {
                                        return(<p style={{marginBottom:'0'}} key={area._id}>{area.name}</p>)
                                    })}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
    componentDidMount() {
        this.getCity();
        this.getAreas();
    }
    getCity = () => {
        const {params} = this.props.match;
        api.getCity(params.id)
            .then(response => {
                const {city} = response.data;
                this.setState(
                    produce(draft => {
                        draft.city = city;
                    })
                )
            })
    }
    getAreas = () => {
        const {params} = this.props.match;
        api.getCityAreas(params.id)
            .then(response => {
                const {areas} = response.data;
                this.setState(
                    produce(draft => {
                        draft.areas = areas;
                    })
                )
            })

    }
    _onFeatureGroupReady = (reactFGref) => {

        // populate the leaflet FeatureGroup with the geoJson layers

        let leafletGeoJSON = new L.GeoJSON(this.getGeoJson());
        // let leafletFG = reactFGref.leafletElement;

        leafletGeoJSON.eachLayer((layer) => {
            // leafletFG.addLayer(layer);
        });

        // store the ref for future access to content

        this._editableFG = reactFGref;
    }   
    _onCreated = (e) => {
        console.log(e);
        let type = e.layerType;
        let layer = e.layer;
        if (type === 'marker') {
            // Do marker specific actions
            console.log("_onCreated: marker created", e);
        }
        else {
            const geoCoords = e.layer._latlngs[0];
            const latLongs = [];
            geoCoords.forEach((point, index) => {
                latLongs.push([point.lat, point.lng]);
            });
            const allAreaCoords = [...this.state.areaCoords, latLongs]
            console.log(latLongs);
            this.setState({
                areaCoords: allAreaCoords
            });
        }
        // Do whatever else you need to. (save to db; etc)
        this._onChange();
    }

    _onDeleted = (e) => {

        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        })
        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        this._onChange();
    }

    _onMounted = (drawControl) => {
        console.log('_onMounted', drawControl);
    }

    _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
    }

    _onDeleteStop = (e) => {
        console.log('_onDeleteStop', e);
    }

    _onChange = () => {

        // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

        const { onChange } = this.props;

        if (!this._editableFG || !onChange) {
            return;
        }

        const geojsonData = this._editableFG.leafletElement.toGeoJSON();

        onChange(geojsonData);
    }    

    getGeoJson = () => {
        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    -122.48069286346434,
                                    37.800637436707525
                                ],
                                [
                                    -122.48069286346434,
                                    37.803104310307276
                                ],
                                [
                                    -122.47950196266174,
                                    37.803104310307276
                                ],
                                [
                                    -122.47950196266174,
                                    37.800637436707525
                                ],
                                [
                                    -122.48069286346434,
                                    37.800637436707525
                                ]
                            ]
                        ]
                    }
                }
            ]
        }
    }    
    
}

export default Areas;