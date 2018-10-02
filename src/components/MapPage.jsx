import React, { Component } from 'react';
import { Map, TileLayer, Circle, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
// import { EditControl } from '../leaflet';
import EditControl from "react-leaflet-draw";
// import { EditControl } from "react-leaflet-draw"


export default class MapPage extends Component {

    state = {
        areaCoords: [],
        area: '',
        image: ''
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
            console.log(latLongs);
            this.setState({
                areaCoords: latLongs
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

    render() {
        return (
            <div>
                <Map center={[53.4808, -2.2426]} zoom={13} zoomControl={false}>
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
                <div>
                    <form onSubmit={(e) => { this.submitArea(e) }}>
                        <input onChange={this.handleArea} placeholder="areaName"></input>
                        <input onChange={this.handleImage} placeholder="image Url"></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div >
        );
    }

    submitArea = (e) => {
        e.preventDefault();
        console.log(this.state);
        const areaObj = {
            ...this.state
        }
        console.log(areaObj)
        // api.postArea()
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

        // populate the leaflet FeatureGroup with the geoJson layers

        let leafletGeoJSON = new L.GeoJSON(getGeoJson());
        let leafletFG = reactFGref.leafletElement;

        leafletGeoJSON.eachLayer((layer) => {
            leafletFG.addLayer(layer);
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

// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176
function getGeoJson(coords) {
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        coords
                    ]
                }
            }
        ]
    }
}