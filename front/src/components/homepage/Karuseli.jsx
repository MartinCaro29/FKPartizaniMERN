import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from "../../img/partizanicarousel1.jpg";
import Img2 from "../../img/partizanicarousel2.jpg";
import Img3 from "../../img/partizanicarousel3.jpg";
import Img4 from "../../img/partizanicarousel4.jpg";
import Img5 from "../../img/partizanicarousel5.jpg";
import '../../index.css'
import './karuseli.css'



function Karuseli() {
    const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 735); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div style={{ width: '100%', overflow: 'hidden', position: 'relative', zIndex: '0' }}>
      <div className="title-before-carousel" style={{ textAlign: 'center', marginBottom: '20px', zIndex:2, top: (isMobile) ? '40%' : "" }}>
      <h1 style={{ fontSize: isMobile ? '4rem' : '8rem', color: 'white' }}>Partizani Insider</h1>
        <p style={{ fontSize: isMobile ? '1.5rem' : '3rem', color: 'white' }}>Gjithcka rreth Partizanit</p>
      </div>

     
      <Carousel style={{ width: '100%' }} interval={2000}>
     
        {[Img1, Img2, Img3, Img4, Img5].map((img, index) => (
          <Carousel.Item key={index} className="carousel-item">
            
            <div className="dark-overlay"></div>
            
            <img
              alt={`Slide ${index + 1}`}
              src={img}
              className="d-block w-100 carousel-img"

              style={{padding:0}}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Karuseli;
