import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Details from '../Components/details';
import OgtForm from '../Components/oGT/ogt_form';
import OgvForm from '../Components/oGV/ogv_form';
import './formcontainer.css'
import logo from './Images/GT/product_GT-Vertical-white.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function FormContainer() {
    let entities = ['CC', 'CN' , 'CS' ,'USJ','Kandy','Ruhuna','SLIIT', "NSBM"]
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
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/oGT" element={<OgtForm entity = "" />} />
                                {
                                    entities.map(entity => {
                                        return <Route path={"/oGT/" + entity} element={<OgtForm entity={entity} />} />
                                    })
                                }
                                <Route exact path="/oGV" element={<OgvForm entity = "" />} />
                                {
                                    entities.map(entity => {
                                        return <Route path={"/oGV/" + entity} element={<OgvForm entity={entity} />} />
                                    })
                                }
                            </Routes>
                        </BrowserRouter>
                    </Col>
                </Row>
                {/* <Row className='al'>
                </Row> */}
            </Container>
        </div>

    )
}