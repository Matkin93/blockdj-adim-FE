import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import EditControl from '../../Leaflet/EditControl';
import Draw from 'leaflet-draw';
import * as API from '../../../utils/api';
import './map.css';

export default class MapPage extends Component {
    state = {
        areaCoords: [],
        city: ''
    }

    _onCreated = (e) => {
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
            this.setState({
                areaCoords: allAreaCoords
            });
            this.submitArea()
        }
        this._onChange();
    }

    _onEdited = (e) => {

        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
        })
        console.log(`_onEdited: edited ${numEdited} layers`, e);

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

    render() {
        let city = this.props.city;
        API.getArea(this.props.cityId)
            .then(res => {
                if (res.data.area) {
                    let cityId = res.data.area.city
                    API.getCity(cityId)
                        .then(res => {
                            this.setState({
                                city: res.data.city.name
                            })
                        })
                }
            })

        const cityCoords = {
            'Leeds': [53.8008, -1.5491],
            'York': [53.9600, -1.0873],
            'Manchester': [53.4808, -2.2426],
            'Liverpool': [53.4084, -2.9916],
            'Edinburgh': [55.9533, -3.1883],
            'London': [51.5074, -0.1278],
            'Birmingham': [52.4862, -1.8904],
            'Bristol': [51.4545, 2.5879],
            'Sheffield': [53.3811, 1.4701]
        }
        return (
            <div>
                <Map className="map" center={city !== '' ? cityCoords[city] : cityCoords[this.state.city]} zoom={13} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup ref={(featureGroup) => { this._onFeatureGroupReady(featureGroup); }}>
                        <EditControl
                            position='topright'
                            onEdited={this._onEdited}
                            onCreated={this._onCreated}
                            onDeleted={this._onDeleted}
                            onMounted={this._onMounted}
                            onEditStart={this._onEditStart}
                            onEditStop={this._onEditStop}
                            onDeleteStart={this._onDeleteStart}
                            onDeleteStop={this._onDeleteStop}
                            draw={{
                                rectangle: false
                            }}
                        />
                    </FeatureGroup>
                </Map>
            </div >
        );
    }

    _editableFG = null

    _onFeatureGroupReady = (featureGroup) => {

        // populate the leaflet FeatureGroup with the geoJson layers
        // let leafletGeoJSON = new L.GeoJSON(getGeoJson());
        // console.log(featureGroup);
        // let leafletFG = featureGroup.leafletElement;

        // leafletGeoJSON.eachLayer((layer) => {
        //     leafletFG.addLayer(layer);
        // });

        // // store the ref for future access to content
        // this._editableFG = featureGroup;
    }

    submitArea = () => {
        if (!this.state.areaCoords.length > 0) {
        }
        else {
            this.props.func(this.state.areaCoords)
            this.setState({
                areaCoords: []
            })
        }
    }

    handleArea = (e) => {
        e.preventDefault();
        this.setState({
            area: e.target.value
        })
    }

    handleImage = (e) => {
        e.preventDefault();
        this.setState({
            image: e.target.value
        });
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
}


// Should return an array of polygon 'features' to be rendered on map.
function getGeoJson() {
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
                            [53.48100468801414, -2.2387456521391873],
                            [53.47878038942996, -2.2423079609870915],
                            [53.47766081361639, -2.2397377341985707],
                            [53.48028162419457, -2.2364030778408055]
                        ]
                    ]
                }
            }, {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [53.48917471214232, -2.2421133331954484],
                            [53.488341273180986, -2.2454424574971203],
                            [53.48687822703018, -2.2444911114871506],
                            [53.48687503516448, -2.2416203096508984],
                            [53.48784046384097, -2.2404245473444466]
                        ]
                    ]
                }
            }, {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [53.48605057818651, -2.2358848247677092],
                            [53.48479643124272, -2.2385338414460425],
                            [53.48210227893245, -2.23463005386293],
                            [53.484131886909864, -2.2319074440747504]
                        ]
                    ]
                }
            }

        ]
    }
}