import {React,useState, useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'

import Standings from '../homepage/Standings'
import Ndeshjet from './Ndeshjet';
const AllMatches = () => {
    const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    
    <div style={{overflow:'hidden'}}>
    <Row>
       <Col md={8} xs={12} >
       <Ndeshjet/>
       </Col>

       <Col md={4} xs={12} style={{display: isMobile ? 'none' : 'flex', position: 'fixed', right: 0, height: '100%'}} >
       <Standings/>
       </Col> 
     </Row>  
       
    </div>
  )
}

export default AllMatches