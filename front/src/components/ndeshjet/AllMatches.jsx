import {React,useState, useEffect, useRef} from 'react'
import {Row,Col} from 'react-bootstrap'

import Standings from '../homepage/Standings'
import Ndeshjet from './Ndeshjet';
const AllMatches = ({footerNavRef}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarFixed, setSidebarFixed] = useState(true);
   
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

       <Col md={4} xs={12} style={{display: isMobile ? 'none' : 'flex', position: sidebarFixed ? 'fixed' : 'relative',
            opacity: sidebarFixed ? 1 : 0, right: 0, height: '100%'}} >
       <Standings/>
       </Col> 
     </Row>  
       
    </div>
  )
}

export default AllMatches