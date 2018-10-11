import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class CityAreas extends Component {
    state = {
        areas: []
    }
    render() {
        const { areas, id, city, addedArea } = this.props;
        return (
            <Table className="areas-table" bordered striped>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Name</th>
                        <th>Area Colour</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {areas && (
                        areas.map(area => {
                            return (
                                <tr key={area._id}>
                                    <td>{city}</td>
                                    <td><Link to={{ pathname: `/areas/${area._id}`, state: { name: area.name } }}>{area.name}</Link></td>
                                    <td>{area.areaColor}</td>
                                </tr>
                            )
                        })
                    )}
                    {areas && this.state.areas && this.state.areas.length === 0 && (
                        <tr>
                            <td colSpan="3">No areas currently added</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const { areas } = this.props;
            this.setState({
                areas: areas
            })
        } else {

        }
        // console.log(this.props)
        // const newArea = this.props.addedArea;
        // console.log(this.state.areas);
    }

}

export default CityAreas;


