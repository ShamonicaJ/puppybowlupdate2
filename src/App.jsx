import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllPlayers from './components/AllPlayers';
import NewPlayerForm from './components/NewPlayerForm';
import PlayerDetails from './components/Details';
import SinglePlayerDelete from './components/SinglePlayer';
import './index.css';

function App() {
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          'https://fsa-puppy-bowl.herokuapp.com/api/2306-fsa-et-web-pt-sf/players'
        );
        const result = await response.json();
        setAllPlayers(result.data.players);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayers();
  }, []);

  return (
    <BrowserRouter>
      <NavBar allPlayers={allPlayers} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='AllPlayers' element={<AllPlayers />} />
        <Route path='NewPlayerForm' element={<NewPlayerForm />} />
        <Route path='DeletePlayer' element={<SinglePlayerDelete />} />
        <Route path='Details/:id' element={<PlayerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;