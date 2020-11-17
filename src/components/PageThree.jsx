import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Audio from './Audio';

const PageThree = () => {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col><Audio /></Col>
      </Row>
    </Container>
  )
}

export default React.memo(PageThree);