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
                        <th>Colour</th>
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
                                    <td>{area.colour}</td>
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

// const CityAreas = (props) => {
//     // console.log(props)
//     const { areas, id, city, addedArea
//     } = props;

//     const areasObj = areas[0];

//     let areasArr = [];
//     if (areasObj) Object.keys(areasObj).forEach(key => areasArr.push(key, areasObj[key]));
//     areasArr;
//     areasArr.shift();
//     areasArr = areasArr[0]
//     console.log(areasArr);
//     // if (addedArea !== {}) {
//     //     areasArr.push(addedArea)
//     // }
//     return (
//         <Table className="areas-table" bordered striped>
//             <thead>
//                 <tr>
//                     <th>City</th>
//                     <th>Name</th>
//                     <th>Colour</th>
//                     {/* <th></th> */}
//                 </tr>
//             </thead>
//             <tbody>
//                 {areasArr && (
//                     areasArr.map(area => {
//                         return (
//                             <tr key={area._id}>
//                                 <td>{city}</td>
//                                 <td><Link to={{ pathname: `/areas/${area._id}`, state: { name: area.name } }}>{area.name}</Link></td>
//                                 <td>{area.colour}</td>
//                             </tr>
//                         )
//                     })
//                 )}
//                 {areas && areasArr && areasArr.length === 0 && (
//                     <tr>
//                         <td colSpan="3">No areas currently added</td>
//                     </tr>
//                 )}
//             </tbody>
//         </Table>
//     );
// };

// export default CityAreas;


