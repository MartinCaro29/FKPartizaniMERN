import { useState, useEffect, React } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';

const Kategorite = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    categories.length === 0 ? (
      <p className="text-center">Po ngarkohet renditja...</p>
    ) : (
      <Container className="flex-column" style={{ width: '100%', height: '100%', alignItems: 'center', padding: '15px', backgroundColor: '#f8f9fa', userSelect: 'none' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'cinzel' }}>
          Dyqani
        </h1>

        <div className="flex-column" style={{ alignItems: 'center' }}>
          {categories.map((category, index) => {
            return (
              <Button key={index} variant="light" style={{ fontSize: '1rem', width: '80%', height: '50px', fontFamily: 'cinzel', textAlign: 'left' }}>
                {category}
              </Button>
            );
                
          })}
          
          <Button variant="light" style={{ fontSize: '1rem', width: '80%', height: '50px', fontFamily: 'cinzel', textAlign: 'left' }}>
                Te gjitha
              </Button>
        </div>
      </Container>
    )
  );
};

export default Kategorite;
