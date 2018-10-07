import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import EditControl from '../../Leaflet/EditControl';
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
        const { areas } = this.props;
        const areasObj = areas[0];
        let area = {};
        let city = this.props.city;
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr;
        areasArr.shift();
        areasArr = areasArr[0]
        if (Array.isArray(areasArr)) {
            getGeoJson(areasArr);
        }
        if ((city === '') && (Array.isArray(areasArr))) {
            API.getArea(this.props.cityId)
                .then(res => {
                    let cityId = res.data.area.city
                    API.getCity(cityId)
                        .then(res => {
                            this.setState({
                                city: res.data.city.name
                            })
                        })
                })
        }

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
                    <FeatureGroup ref={(reactFGref) => { this._onFeatureGroupReady(reactFGref); }}>
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

    _editableFG = null

    _onFeatureGroupReady = (reactFGref) => {
        const { areas } = this.props;
        const areasObj = areas[0];
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr;
        areasArr.shift();
        areasArr = areasArr[0]
        if (Array.isArray(areasArr)) {
            new L.GeoJSON(getGeoJson(areasArr));
        }

        // populate the leaflet FeatureGroup with the geoJson layers
        let leafletGeoJSON = new L.GeoJSON(getGeoJson(areasArr));
        // let leafletFG = reactFGref.leafletElement;

        leafletGeoJSON.eachLayer((layer) => {
            // leafletFG.addLayer(layer);
        });

        // store the ref for future access to content

        this._editableFG = reactFGref;
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

function getGeoJson(arr) {
    if (Array.isArray(arr)) {
        return {
            "type": "FeatureCollection",
            "features": [
                arr.map(area => {
                    return {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                area.bounds.coordinates
                            ]
                        }
                    }
                })
            ]
        }
    }
}