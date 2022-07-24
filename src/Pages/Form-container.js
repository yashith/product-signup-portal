import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Details from '../Components/details';
import OgtForm from '../Components/oGT/ogt_form';
import OgvForm from '../Components/oGV/ogv_form';
import './formcontainer.css'
import logooGT from './Images/GT/product_GT-Vertical-white.png'
import logooGV from './Images/GV/product_GV-vertical-white.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function FormContainer(props) {
    
    return (
        <div className={props.product === "oGT" ? 'wrapper-background-oGT ' : "wrapper-background-oGV"}>
            <div className='wrapper-background' />
            <div className='logo'>
                <img hidden={props.product === "oGV" ? true : false} src={logooGT} alt="oGT_Logo"></img>
                <img hidden={props.product === "oGT" ? true : false} src={logooGV} alt="oGT_Logo"></img>

            </div>
            <Container className='main'>
                {/* <Row className='al'>
                </Row> */}

                <Row className='full-row'>
                    <Col xs="7" className='col-center detail-col'>
                        <Details />
                    </Col>
                    <Col xs="12" md="5" className='col-center'>

                        <Routes >
                            {
                              entityMap(props.product)  
                            }

                        </Routes>

                    </Col>
                </Row>
                {/* <Row className='al'>
                </Row> */}
            </Container>
        </div>

    )
}
function entityMap(product){
    let entities = ['CC', 'CN', 'CS', 'USJ', 'Kandy', 'Ruhuna', 'SLIIT', "NSBM"]
    if (product === "oGT") {
        return (
            <>
                <Route key="GTEntitiyDefault" path="" element={<OgtForm entity="" />} />
                {
                    entities.map(entity => {
                        return <Route key={entity} path={"/" + entity} element={<OgtForm entity={entity} />} />
                    })
                }
            </>
        )
    }
    else if (product === "oGV") {
        return (
            <>
                <Route key="GVEntitiyDefault" path="" element={<OgvForm entity="" />} />
                {
                    entities.map(entity => {
                        return <Route key={entity} path={"/" + entity} element={<OgvForm entity={entity} />} />
                    })
                }
            </>
        )
    }
}