import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class AreaList extends Component {
    render() {
        const { areas } = this.props;
        const areasObj = areas[0];
        let areasArr = [];
        if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
        areasArr = areasArr[1];
        return (
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
                                    <td></td>
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
        );
    }
}

export default AreaList;