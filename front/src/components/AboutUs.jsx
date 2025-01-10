import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import './aboutandhistory.css'
import Img1 from "../img/partizanicarousel1.jpg";
import Img2 from "../img/partizanicarousel2.jpg";
const AboutUs = () => {
  return (
    <Container className="about-us">
     <div className="section-header" style={{margin:'40px 0'}}>Kush jemi ne</div>
      <Row style={{marginBottom:'50px'}}>
        <Col md={6} sm={12}>
          
          <p>
            <strong>Partizani Insider</strong> është shtëpia e çdo tifozi të vërtetë të FK Partizanit. Ne jemi një komunitet i apasionuar që
            synojmë të sjellim më të mirën nga bota e klubit tonë të zemrës. Në faqen tonë do të gjeni gjithçka që ju nevojitet: lajmet më të
            fundit, raportet dhe analizat e detajuara të ndeshjeve, informacione të plota për lojtarët dhe përditësime mbi ekipin.
          </p>
        </Col>
        <Col md={6} sm={12}>
          <img src={Img1} className="paragraph-image" alt="Partizani Insider" />
        </Col>
      </Row>
<hr></hr>

      <Row className="evenrow" style={{margin:'50px 0'}}>
      <Col md={6} sm={12}>
          <img src={Img2} className="paragraph-image" alt="Tifozët e Partizanit" />
          </Col>
        <Col md={6} sm={12}>
          <p>
            Përveç kësaj, ne ofrojmë një dyqan ekskluziv për tifozët, ku mund të gjeni produkte dhe suvenire që përfaqësojnë krenarinë e të
            qënit pjesë e Partizanit. Misioni ynë është të krijojmë një hapësirë ku dashuria për Partizanin të ndajë emocionet e fitoreve,
            historinë e lavdishme dhe mbështetjen për të ardhmen e klubit. Bashkohuni me ne dhe bëhuni pjesë e pasionit të kuq që na
            bashkon!
          </p>
          </Col>
        </Row>
    </Container>
  );
};

export default AboutUs;