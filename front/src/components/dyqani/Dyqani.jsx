import { useState, useEffect, useRef } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Produktet from './Produktet';
import axios from 'axios';

const Dyqani = ({ footerNavRef }) => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Te gjitha");
  const [sidebarFixed, setSidebarFixed] = useState(true);
  
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(`Something went wrong: ${error}`);
      });
  }, []);

  const getCategories = (products) => {
    const uniqueCategories = new Set();
    products.forEach((product) => {
      if (product && product.category) {
        uniqueCategories.add(product.category);
      }
    });

    const categories = [...uniqueCategories];
    categories.sort();
    return categories;
  };

  const categories = getCategories(products);
  

 useEffect(() => {
       const handleScroll = () => {
        
         const footerPosition = footerNavRef.current.getBoundingClientRect().top;
         if (footerPosition <= window.innerHeight) {
           
           setSidebarFixed(false);
         } else {
           
           setSidebarFixed(true);
         }
       };
   
       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
     }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Row>
        <Col
          md={4}
          xs={12}
          style={{
            backgroundColor: 'rgb(248, 249, 250)',
            display: isMobile ? 'none' : 'flex',
            position: sidebarFixed ? 'fixed' : '',
            display: sidebarFixed ? '' : 'none',
            opacity: sidebarFixed ? 1 : 0,
            left: 0,
            height: '100%',
            padding: 0,
            zIndex: 1,
          }}
        >
          <div>
            {categories.length === 0 ? (
              <p className="text-center">Po ngarkohen kategorite...</p>
            ) : (
              <Container
                className="flex-column"
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  userSelect: 'none',
                }}
              >
                <h1
                  style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    fontFamily: 'cinzel',
                    marginBottom: '20px',
                    color: 'rgb(188, 0, 0)',
                  }}
                >
                  Dyqani
                </h1>

                <div
                  className="flex-column"
                  style={{ alignItems: 'center', overflowY: 'auto', maxHeight: '600px' }}
                >
                  {categories.map((category, index) => {
                    return (
                      <Button
                        key={index}
                        href="#top"
                        onClick={() => {
                          setCurrentCategory(category);
                        }}
                        variant="light"
                        style={{
                          fontSize: '1.3rem',
                          width: '80%',
                          height: '50px',
                          fontFamily: 'cinzel',
                          textAlign: 'left',
                          marginBottom: '10px',
                        }}
                      >
                        {category}
                      </Button>
                    );
                  })}

                  <Button
                    variant="light"
                    href="#top"
                    onClick={() => {
                      setCurrentCategory('Te gjitha');
                    }}
                    style={{
                      fontSize: '1.3rem',
                      width: '80%',
                      height: '50px',
                      fontFamily: 'cinzel',
                      textAlign: 'left',
                      marginBottom: '10px',
                    }}
                  >
                    Te gjitha
                  </Button>
                </div>
              </Container>
            )}
          </div>
        </Col>

        <Col md={8} xs={12} style={{ marginLeft: isMobile ? '0' : '33.33%', padding: '20px' }}>
          <Produktet category={currentCategory} products={products} />
        </Col>
      </Row>
    </div>
  );
};

export default Dyqani;
