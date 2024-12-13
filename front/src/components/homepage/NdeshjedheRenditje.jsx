import React from 'react'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LastMatches from './LastMatches';
import Standings from './Standings';

const NdeshjedheRenditje = () => {
  return (
    <Container>
        <Row>
        <div className="col-md-6 col-xs-12" style={{marginTop:'20px'}}>
          <LastMatches/>
        </div>
        <div className="col-md-6 col-xs-12" style={{marginTop:'20px'}}>
          <Standings/>
          </div>
      </Row>

    </Container>
  )
}

export default NdeshjedheRenditje