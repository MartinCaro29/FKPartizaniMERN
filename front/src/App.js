import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Kreu from './components/homepage/Kreu';
import Contact from './components/Contact';
import AllMatches from './components/ndeshjet/AllMatches';
import Dyqani from './components/dyqani/Dyqani';
import BlejProdukt from './components/dyqani/BlejProdukt';
import FooterNav from './components/FooterNav';
import CreateTeam from './components/TeamCRUD/CreateTeam';
import DeleteTeam from './components/TeamCRUD/DeleteTeam';
import UpdateTeam from './components/TeamCRUD/UpdateTeam';
import Lojtaret from './components/lojtaret/Lojtaret';
import CreateMatch from './components/MatchCRUD/CreateMatch';
import DeleteMatch from './components/MatchCRUD/DeleteMatch';
import UpdateMatch from './components/MatchCRUD/UpdateMatch';
import CreatePlayer from './components/PlayerCRUD/CreatePlayer';
import DeletePlayer from './components/PlayerCRUD/DeletePlayer';
import AllContacts from './components/AllContacts';
import CreateProduct from './components/ProductCRUD/CreateProduct';
import DeleteProduct from './components/ProductCRUD/DeleteProduct';
function App() {
  const [sidebarFixed, setSidebarFixed] = useState(true); 
  const footerNavRef = useRef(null); 

  useEffect(() => {
    
    const handleScroll = () => {
      if (footerNavRef.current) {
        const footerPosition = footerNavRef.current.getBoundingClientRect();
        
        if (footerPosition.top <= window.innerHeight) {
          setSidebarFixed(false);
        } else {
          setSidebarFixed(true);
        }
      }
    };

    
    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Kreu />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/getContacts" element={<AllContacts/>}/>
        <Route path="/ndeshjet" element={<AllMatches footerNavRef={footerNavRef}/>} />
        <Route path="/dyqani" element={<Dyqani footerNavRef={footerNavRef} />} />
        <Route path="/dyqani/:slug" element={<BlejProdukt/>} />
        <Route path="/addTeam" element={<CreateTeam/>}/>
        <Route path="/deleteTeam" element={<DeleteTeam/>}/>
        <Route path="/updateTeam/:id" element={<UpdateTeam/>}/>
        <Route path="/addMatch" element={<CreateMatch/>}/>
        <Route path="/deleteMatch" element={<DeleteMatch/>}/>
        <Route path="/updateMatch/:id" element={<UpdateMatch/>}/>
        <Route path="/addPlayer" element={<CreatePlayer/>}/>
        <Route path="/deletePlayer" element={<DeletePlayer/>}/>
        <Route path="/addProduct" element={<CreateProduct/>}/>
        <Route path="/deleteProduct" element={<DeleteProduct/>}/>
        <Route path="/lojtaret" element={<Lojtaret/>}/>

      </Routes>
      <FooterNav ref={footerNavRef} />
    </div>
  );
}

export default App;
