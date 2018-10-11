import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import produce from 'immer';
import CityForm from './Form';
import CityList from './List';
import * as api from '../../utils/api';

class Cities extends Component {
    state = {
        cities: []
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <CityForm addCity={this.addCity} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CityList {...this.props} {...this.state} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
    componentDidMount() {
        this.getCities();
    }
    getCities = () => {
        api.getCities()
            .then(response => {
                const { cities } = response.data;
                this.setState({ cities });
            })
    }
    addCity = (text) => {
        api.addCity({ name: text })
            .then(response => {
                const { city } = response.data;
                this.setState(
                    produce(draft => {
                        draft.cities.unshift(city);
                    })
                )
            })
            .catch(err => console.log);
    }
}

export default Cities;