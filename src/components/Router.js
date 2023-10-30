import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MenuRutas from './MenuRutas';
import Serie from './Serie';
import Personajes from './Personajes';
import CrearPersonaje from './CrearPersonaje';
import ModificarPersonaje from './ModificarPersonajes';
import { useParams } from 'react-router-dom';

export default class Router extends Component {
  render() {

    function SerieElement(){
        var {idSerie} = useParams();
        return<Serie idSerie = {idSerie}/>
      }

    function PersonajesElement(){
        var {idSerie, nombreSerie} = useParams();
        return<Personajes idSerie = {idSerie} nombreSerie = {nombreSerie}/>
    }


    return (
      <BrowserRouter>
        <MenuRutas />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevopersonaje" element={<CrearPersonaje />} />
          <Route path="/modificarpersonajes" element={<ModificarPersonaje />} />
          <Route path="/serie/:idSerie" element={<SerieElement />} />
          <Route path="/personajes/:idSerie/:nombreSerie" element={<PersonajesElement />} />
        </Routes>
      </BrowserRouter>
    );
  }
}