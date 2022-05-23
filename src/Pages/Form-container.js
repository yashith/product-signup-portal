import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Details from '../Components/details';
import IgtForm from './../Components/igt_form';
import './formcontainer.css'


export default function FormContainer() {
    return (
        <div className='wrapper-background'>
            <Container className='main'>
                {/* <Row className='al'>

                </Row> */}
                <Row className='full-row'>
                    <Col xs="7" className='col-center'>
                        <Details/>
                    </Col>
                    <Col xs="5" className='col-center'>
                        <IgtForm />
                    </Col>
                </Row>
                {/* <Row className='al'>
                </Row> */}
            </Container>
        </div>

    )
}