import {React,useState, useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import { Container, Button } from 'react-bootstrap';
import Produket from './Produktet'
import axios from 'axios';
const Dyqani = () => {

  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Te gjitha");

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

    
    <div style={{overflow:'hidden'}}>
      
    <Row>
       <Col md={4} xs={12} style={{display: isMobile ? 'none' : 'flex', position: 'fixed', left: 0, height: '100%', padding:0}}>
       {categories.length === 0 ? (
      <p className="text-center">Po ngarkohen kategorite...</p>
    ) : (
      <Container className="flex-column" style={{ width: '100%', height: '100%', alignItems: 'center', padding: '15px', backgroundColor: '#f8f9fa', userSelect: 'none' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'cinzel', marginBottom:'20px', color: 'rgb(188, 0, 0)' }}>
          Dyqani
        </h1>

        <div className="flex-column" style={{ alignItems: 'center', overflowY: 'auto', maxHeight: '600px'}}>
          {categories.map((category, index) => {
            return (
              <Button key={index} onClick={()=>{setCurrentCategory(category)}} variant="light" style={{ fontSize: '1.3rem', width: '80%', height: '50px', fontFamily: 'cinzel', textAlign: 'left', marginBottom:'10px'}}>
                {category}
              </Button>
            );
                
          })}
          
          <Button variant="light" onClick={()=>{setCurrentCategory("Te gjitha")}} style={{ fontSize: '1.3rem', width: '80%', height: '50px', fontFamily: 'cinzel', textAlign: 'left', marginBottom:'10px'}}>
                Te gjitha
              </Button>
              
        </div>

      </Container>
    )}
       </Col>

       <Col md={8} xs={12}>
       
       </Col> 
     </Row>  
       
    </div>
  )
}

export default Dyqani;