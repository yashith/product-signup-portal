import React from 'react';
import TimeLine from './Timeline prot/timeline';
import { Col, Container , Row } from 'react-bootstrap';

export default function Details() {
    let steps =[{title:"Sign up", description:"Sign up to create your account and access our opportunities. It's free!"} , {title:"Apply", description:"Fill out your profile and apply for opportunities."} , {title:"Selection", description:"You will be contacted for an interview by the company."} , {title:"Approved", description:"Once the interview is completed successfully, pay the AIESEC program registration fee to get approved."} , {title:"Let's Go", description:"AIESEC will now support in visa, departure and experience abroad."}]
    return (
        <Container>
            <Row style={{paddingBottom:"5%"}}>
                <Col md-12>
                    <h2 style={{ color: "black" , textAlign:"center"}}><b>The Process</b></h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TimeLine items = {steps}/>
                </Col>
            </Row>


        </Container>
    )
}