import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class AreaList extends Component {
    render() {
        const {areas} = this.props;
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
                    {areas && (
                        aress.map(area => {
                            return (
                                <tr key={area._id}>
                                    <td>{area.name}</td>
                                    <td>{area.colour}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    )}
                    {areas.length === 0 && (
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