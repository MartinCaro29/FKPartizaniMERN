import { useState, useEffect, useRef } from 'react';
import { Row, Col, Container, Button, Dropdown } from 'react-bootstrap';
import Produktet from './Produktet';
import axios from 'axios';
import "./dyqani.css";

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
          md={3}
          xs={12}
          className="category-column"
          style={{
        
            display: isMobile ? 'none' : sidebarFixed ? 'flex' : 'none',
            position: sidebarFixed ? 'fixed' : '',
            opacity: sidebarFixed ? 1 : 0,
            
            

          }}
        >
          <div>
            {categories.length === 0 ? (
              <p className="text-center">Po ngarkohen kategorite...</p>
            ) : (
              <Container
                className="flex-column categories-list"
                
              >
                <h1 className="dyqani-header">
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
                        className="category-button"
                        onClick={() => {
                          setCurrentCategory(category);
                        }}
                        variant="light"
                        
                      >
                        {category}
                      </Button>
                    );
                  })}

                  <Button
                    variant="light"
                    href="#top"
                    className="category-button"
                    onClick={() => {
                      setCurrentCategory('Te gjitha');
                    }}
                    
                  >
                    Te gjitha
                  </Button>
                </div>
              </Container>
            )}
          </div>
        </Col>

        <Col md={8} xs={12} style={{ marginLeft: isMobile ? '0' : '30%', padding: '20px' }}>
          {isMobile && (
            <div className="section-header">Dyqani</div>
          )}

          {isMobile && categories.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Dropdown style={{ width: '80%', marginBottom: '20px' }}>
              <Dropdown.Toggle variant="light" style={{ fontSize: '1.3rem', width: '100%' }}>
                Zgjidh Kategorine
              </Dropdown.Toggle>
          
              <Dropdown.Menu className="mobile-products-dropdown-menu">
                {categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    className="dyqani-dropdown-item"
                    onClick={() => setCurrentCategory(category)}
                    style={{ padding: '10px', fontSize: '1.2rem', color:'black' }} // Customize individual item padding & font size
                  >
                    {category}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item
                  onClick={() => setCurrentCategory('Te gjitha')}
                  style={{ padding: '10px', fontSize: '1.2rem', color:'black' }} // Customize this item as well
                >
                  Te gjitha
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          )}

          <Produktet category={currentCategory} products={products} />
        </Col>
      </Row>
    </div>
  );
};

export default Dyqani;
