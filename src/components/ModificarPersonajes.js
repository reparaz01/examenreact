import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class ModificarPersonajes extends Component {

  cajaPersonajes = React.createRef();
  cajaSeries = React.createRef(); 

  state = {
    status: false,
    series: [],
    personajes: [],
  };

  loadSeries = () => {
    const request = "api/series";
    const url = Global.urlApi + request;

    axios.get(url).then(response => {
      this.setState({
        series: response.data,
      });
    });
  }

  loadPersonajes = () => {
    const request = "api/personajes";
    const url = Global.urlApi + request;

    axios.get(url).then(response => {
      this.setState({
        personajes: response.data,
      });
    });
  }

  modificarPersonaje = (e) => {
    e.preventDefault();
    const idPersonaje = parseInt(this.cajaPersonajes.current.value);
    const idSerie = parseInt(this.cajaSeries.current.value); 

    const url = Global.urlApi + 'api/personajes/' + idPersonaje + "/" + idSerie;

    console.log("idpersonaje " + idPersonaje);
    console.log("idserie " + idSerie);

    axios.put(url)
      .then((response) => {
        this.setState({
          status: true,
        });
      });
  };

  componentDidMount = () => {
    this.loadSeries();
    this.loadPersonajes();
  }

  render() {
    const customButtonStyle = {
      '--bs-btn-padding-x': '5rem',
      '--bs-btn-font-size': '1rem', 
    };

    if (this.state.status) {
      return (
        <Navigate to="/" alert="Personaje Creado correctamente" />
      );
    } else {
      return (
        <div className="container py-4">
          <h1 className="text-center fw-bold mb-4">Personajes y Series</h1>

          <div className="mb-3">
            <label htmlFor="serie" className="form-label">Selecciona un Personaje:</label>
            <select
              className="form-select"
              id="personaje"
              ref={this.cajaPersonajes}
            >
              {this.state.personajes.map(personaje => (
                <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                  {personaje.nombre}
                </option>
              ))}
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="serie" className="form-label">Selecciona una Serie:</label>
            <select
              className="form-select"
              id="serie"
              ref={this.cajaSeries}
            >
              {this.state.series.map(serie => (
                <option key={serie.idSerie} value={serie.idSerie}>
                  {serie.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <br></br>
            <button onClick={this.modificarPersonaje} className="btn btn-primary btn-lg" style={customButtonStyle} alert="Personaje creado correctamente">
              Guardar Cambios
            </button> &nbsp;
            <NavLink to={"/"} className="btn btn-secondary">Volver</NavLink>
          </div>
        </div>
      );
    }
  }
}
