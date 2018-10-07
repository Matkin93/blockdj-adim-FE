import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const CityAreas = (props) => {
    const { areas, id, city } = props;
    const areasObj = areas[0];
    let areasArr = [];
    if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
    areasArr;
    areasArr.shift();
    areasArr = areasArr[0]
    return (
        <Table className="areas-table" bordered striped>
            <thead>
                <tr>
                    <th>City</th>
                    <th>Name</th>
                    <th>Colour</th>
                    {/* <th></th> */}
                </tr>
            </thead>
            <tbody>
                {areasArr && (
                    areasArr.map(area => {
                        return (
                            <tr key={area._id}>
                                <td>{city}</td>
                                <td><Link to={{ pathname: `/areas/${area._id}`, state: { name: area.name } }}>{area.name}</Link></td>
                                <td>{area.colour}</td>
                            </tr>
                        )
                    })
                )}
                {areas && areasArr && areasArr.length === 0 && (
                    <tr>
                        <td colSpan="3">No areas currently added</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default CityAreas;


