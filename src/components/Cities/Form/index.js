import React, { Component, Fragment } from 'react';
import { Alert, Button, Form, Input, Row, Col,  Card, CardBody } from 'reactstrap';

import produce from 'immer';

class CityForm extends Component {
    state = {
        text: '',
        error: false
    }
    render() {
        return (
            <Fragment>
                {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                <Card style={{marginBottom:'1rem', backgroundColor:'#e9ecef'}}>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm={9}>
                                    <Input type="text" name="name" id="name" placeholder="City name..." onChange={(event) => this.setState({text: event.target.value})} value={this.state.text} />
                                </Col>
                                <Col>
                                    <Button color="primary" block onClick={this.addNewCity}>Add City</Button>
                                </Col>
                                <Col>
                                    <Button color="secondary" block onClick={this.clearAndResetForm}>Clear</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
    }
    clearAndResetForm = () => {
        this.setState(
            produce(draft => {
                draft.text = '';
                draft.error = false;
            })
        )
    }
    addNewCity = () => {
        if (this.state.text.length === 0){
            this.setState(
                produce(draft => {
                    draft.error = 'City name is required'
                })
            )
        }else{
            this.props.addCity(this.state.text);
            this.clearAndResetForm()    
        }
    }
}

export default CityForm;