import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
  state = {
    personajes: [],
    personajesSerie : [],
    status: false,
  }

  loadPersonajes = () => {
    const request = "api/personajes/";
    const url = Global.urlApi + request;
  
    axios.get(url)
      .then(response => {
        const personajes = response.data;
        const personajesSerie = [];
  
        for (let i = 0; i < personajes.length; i++) {
          if (personajes[i].idSerie == this.props.idSerie) {
            personajesSerie.push(personajes[i]);
          }
        }
  
        this.setState({
          personajes: personajesSerie,
          status: true,
        }, () => {
          console.log(this.state.personajes.length);
        });
      })
  }
  
  

  componentDidMount = () => {
    this.loadPersonajes();
  }

  render() {
    return (
      <div className="container py-4">
        <h2 className="mb-3">Personajes de la Serie: {this.props.nombreSerie} &nbsp; 
          <NavLink to={"/serie/" + this.props.idSerie} className="btn btn-success">Volver</NavLink>
        </h2>
        {this.state.status && this.state.personajes.length > 0 && (
          <table className="table table-secondary table-bordered">
            <thead>
              <tr>
                <th className="align-middle text-center">Nombre</th>
                <th className="align-middle text-center">Foto</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personajes.map(personaje => (
                <tr key={personaje.idPersonaje}>
                  <td className="align-middle text-center">{personaje.nombre}</td>
                  <td className="align-middle text-center">
                    <img src={personaje.imagen} alt={personaje.nombre} style={{ maxWidth: "100px" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}