import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Details from '../Components/details';
import IgtForm from './../Components/igt_form';
import './formcontainer.css'
import logo from './Images/GT/product_GT-Vertical-white.png'

export default function FormContainer() {
    return (
        <div className='wrapper-background'>
            <div className='logo'>
                <img src={logo}></img>
            </div>
            <Container className='main'>
                {/* <Row className='al'>
                </Row> */}

                <Row className='full-row'>
                    <Col xs="7" className='col-center detail-col'>
                        <Details />
                    </Col>
                    <Col xs="12" md="5" className='col-center'>
                        <IgtForm />
                    </Col>
                </Row>
                {/* <Row className='al'>
                </Row> */}
            </Container>
        </div>

    )
}