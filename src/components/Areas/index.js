import React, { Component } from 'react';
import AreaSeeds from './seeds';

class Areas extends Component {
    state = {
        cityId: ''
    }

    render() {
        const cities = AreaSeeds[0];
        const areas = AreaSeeds[1];
        return (
            <div>
                Area Information by City
            <form>
                    <select onChange={this.selectCity}>
                        {cities.map(city => {
                            return <option value={city.name}>{city.name}</option>
                        })}
                    </select>
                </form>
                <ul>
                    {areas.map(area => {
                        return area.city === this.state.cityId ? <li key={area._id}>{area.name}</li> : null
                    })}
                </ul>
            </div>
        );

    };

    selectCity = (e) => {
        const city = AreaSeeds[0].filter(city => {
            return city.name === e.target.value;
        });
        this.setState({
            cityId: city[0]._id
        });
    }
}
export default Areas;
