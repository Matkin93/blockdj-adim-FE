import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';


class CityList extends Component {
    render() {
        const { cities } = this.props;
        return (
            <Table bordered striped>
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cities && (
                        cities.map(city => {
                            return (
                                <tr key={city._id}>
                                    <td>{city.name}</td>
                                    <td>
                                        <Button color="primary" size="sm" block onClick={() => this.goToArea(city._id)}>Areas</Button>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                    {cities.length === 0 && (
                        <tr>
                            <td colSpan="3">No cities currently added</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
    goToArea = (id) => {
        const { history } = this.props;
        history.push(`/cities/${id}`);
    }
}

export default CityList;