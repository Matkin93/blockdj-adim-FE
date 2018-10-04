import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import areas from '../areas.css';

class AreaList extends Component {
    render() {
        // Accessing individual areas for the city
        const { areas } = this.props;
        const areasObj = areas[0];
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr = areasArr[1];
        return (
            <Fragment>
                <form className="new-area-form">
                    <input></input>
                    <input></input>
                    <input></input>
                    <Button>Add Area</Button>
                </form>
                <Table bordered striped>
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
            </Fragment >
        );
    }
}

export default AreaList;