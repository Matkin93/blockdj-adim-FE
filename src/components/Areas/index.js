import React, { Component } from 'react';
import AreaSeeds from './seeds';

class Areas extends Component {
    state = {
        cityId: '',
        newCity: ''
    }

    render() {
        const cities = AreaSeeds[0];
        const areas = AreaSeeds[1];
        return (
            <div>
                <form className="add-city" onSubmit={(e) => this.addCity(e)}>
                    <input onChange={this.typeNewCity} value={this.state.newCity} placeholder="Add a new city"></input>
                    <button className="submit-city">Add a city</button>
                </form>

                Area Information by City
            <form>
                    <select onChange={this.selectCity}>
                        <option key='select' value='Select City'>Select City</option>
                        {cities.map(city => {
                            return <option key={city._id} value={city.name}>{city.name}</option>
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

    typeNewCity = (e) => {
        this.setState({
            newCity: e.target.value
        });
    }

    addCity = (e) => {
        e.preventDefault();
        console.log(this.state.newCity);
        AreaSeeds[0].push({ 'name': this.state.newCity, _id: "54759eb3c090d83494e2d808" })
        console.log(AreaSeeds[0]);
        this.setState({
            newCity: ''
        })
    }
}
export default Areas;
