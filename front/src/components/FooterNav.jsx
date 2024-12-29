import React, { forwardRef } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import Logo from "../img/logopartizoni.png";
const FooterNav = forwardRef((props, ref) => {

    const curYear = new Date().getFullYear();
  return (
    <footer
    ref={ref} 
      className="mainfooter"
      role="contentinfo"
      style={{
        background: "linear-gradient(90deg, rgba(254,0,0,1) 0%, rgba(208,0,0,1) 100%)",
        color: "white",
        marginTop: "100px",
        zIndex: 7,
        position: "relative",
        userSelect:'none',
        fontFamily:'cinzel'

      }}
      
    >
      <div className="footer-middle py-4">
        <div className="container">
          <div className="row">
           
            <div className="col-md-4 col-sm-6">
              <div className="footer-pad">
                <h3>Partizani Insider</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" style={{textDecoration:'none',color:'white'}}>Kreu</a>
                  </li>
                  <li>
                    <a href="/dyqani" style={{textDecoration:'none',color:'white'}}>Dyqani</a>
                  </li>
                  <li>
                    <a href="/kontakt" style={{textDecoration:'none',color:'white'}}>Na kontaktoni</a>
                  </li>
                   
                </ul>
              </div>
            </div>

            
            <div className="col-md-4 col-sm-6">
              <div className="footer-pad">
                <h3>Ekipi</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="/aboutus" style={{textDecoration:'none',color:'white'}}>Kush jemi ne</a>
                  </li>
                  <li>
                    <a href="/historia" style={{textDecoration:'none',color:'white'}}>Historia</a>
                  </li>
                  <li>
                    <a href="/ndeshjet" style={{textDecoration:'none',color:'white'}}>Ndeshjet</a>
                  </li>
                  <li>
                    <a href="/lojtaret" style={{textDecoration:'none',color:'white'}}>Lojtaret</a>
                  </li>

                </ul>
              </div>
            </div>

           
            <div className="col-md-4 col-sm-6">
              <div className="footer-pad" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <h3>Rrjete Sociale</h3>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent:'space-around'}}>
                              <a className="social-icon" target="_blank" href="https://www.facebook.com/partizaniinsider/"><FaFacebook /></a>
                              <a className="social-icon" target="_blank" href="https://www.instagram.com/partizaniinsider/"><FaInstagram /></a>
                              <a className="social-icon" target="_blank" href="https://www.tiktok.com/@partizaniinsider"><FaTiktok /></a>
                            </div>
              </div>
            </div>

           
           
          </div>

          
          <div className="row">
            <div
              className="col-md-12 copy text-center mt-3"
              style={{
                borderTop: "1px solid white",
                paddingTop: "10px",
                display: 'flex',
                justifyContent:'space-between'
              }}
            >
                <a className="brand-name" href="/" style={{ color: 'white', fontSize: '2.5rem' }}>
          <img
            src={Logo}
            width="60px"
            height="60px"
            className="d-inline-block align-top"
            alt="Partizani logo"
            style={{ marginRight: '0.6rem' }}
          />
          
        </a>
              <p style={{alignItems:'center', marginTop:'15px'}}>&copy; {`Copyright ${curYear} - Partizani Insider. Te gjitha te drejtat e rezervuara.`}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

// Export the FooterNav component with forwardRef applied
export default FooterNav;
