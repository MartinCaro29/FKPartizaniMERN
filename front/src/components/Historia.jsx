import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Img1 from "../img/partizanihistory1.jpg";
import Img2 from "../img/partizanihistory2.jpg";
import Img3 from "../img/partizanihistory3.jpg";
import Img4 from "../img/partizanihistory4.jpg";

const Historia = () => {
  return (
    <Container className="history">
      <div className="section-header" style={{margin:'40px 0'}}>Historia e FK Partizanit</div>
      
     
      <Row style={{marginBottom:'50px'}}>
        <Col md={6} sm={12}>
          <p>
            FK Partizani është themeluar në vitin 1946, duke lindur si një nga klubet më të rëndësishme dhe më të dashura të futbollit shqiptar. Me një histori të pasur, klubi u krijua nga një grup entuziastësh të cilët synuan të ndërtonin një ekip që të përfaqësonte krenarinë dhe shpirtin sportiv të kryeqytetit. Që nga fillimi, Partizani ka qenë një simbol i vendosmërisë dhe pasionit për futbollin.
          </p>
        </Col>
        <Col md={6} sm={12}>
          <img src={Img1} className="paragraph-image" alt="Themelimi i Partizanit" />
        </Col>
      </Row>

      <hr></hr>
      <Row className="evenrow" style={{margin:'50px 0'}}> 
        <Col md={6} sm={12}>
          <img src={Img2} className="paragraph-image" alt="Skuadra legjendare" />
        </Col>
        <Col md={6} sm={12}>
          <p>
            Në vitet e para pas krijimit, FK Partizani u shqua për performancat e tij të shkëlqyera, duke u bërë një nga forcat kryesore në futbollin shqiptar. Klubi ka pasur gjithmonë lojtarë të talentuar që kanë përfaqësuar me dinjitet si Partizanin, ashtu edhe kombëtaren shqiptare. Atmosfera e zjarrtë që tifozët sjellin në çdo ndeshje është një nga shtyllat që e bën këtë klub të veçantë.
          </p>
        </Col>
      </Row>

      <hr></hr>
      <Row style={{margin:'50px 0'}}>
        <Col md={6} sm={12}>
          <p>
            Partizani ka kaluar nëpër periudha të ndryshme, duke përballuar sfida të shumta, por gjithmonë duke ruajtur identitetin dhe frymën luftëtare. Klubi ka qenë gjithmonë një vatër për zhvillimin e futbollistëve të rinj, duke promovuar talentet e reja dhe duke luajtur një rol të rëndësishëm në historinë e futbollit shqiptar.
          </p>
        </Col>
        <Col md={6} sm={12}>
          <img src={Img3} className="paragraph-image" alt="Sfida dhe suksese" />
        </Col>
      </Row>

      <hr></hr>
      <Row className="evenrow" style={{margin:'50px 0'}}>
        <Col md={6} sm={12}>
          <img src={Img4} className="paragraph-image" alt="Tifozët dhe trashëgimia" />
        </Col>
        <Col md={6} sm={12}>
          <p>
            Sot, FK Partizani mbetet një nga klubet më të dashura në Shqipëri, duke vazhduar traditën e tij të gjatë dhe të lavdishme. Me tifozë besnikë që i qëndrojnë pranë në çdo moment, klubi përfaqëson jo vetëm një ekip futbolli, por edhe një histori, një kulturë dhe një komunitet të bashkuar nga dashuria për ngjyrat kuqe.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Historia;