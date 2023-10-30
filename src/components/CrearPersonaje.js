import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class CrearPersonaje extends Component {
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaSerie = React.createRef(); // es un select

  state = {
    status: false,
    series: [],
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

  insertPersonaje = (e) => {
    e.preventDefault();
    const nombre = this.cajaNombre.current.value;
    const imagen = this.cajaImagen.current.value;
    const idSerie = parseInt(this.cajaSerie.current.value); 

    const url = Global.urlApi + 'api/personajes';

    const personaje = {
      idPersonaje: 0,
      nombre: nombre,
      imagen: imagen,
      idSerie: idSerie, 
    };

    console.log("nombre " +nombre);
    console.log("img " +imagen);
    console.log("idserie " +idSerie);

    axios.post(url, personaje)
      .then((response) => {
        this.setState({
          status: true,
        });
      });
  };

  componentDidMount = () => {
    this.loadSeries();
  }

  render() {
    const customButtonStyle = {
      '--bs-btn-padding-x': '5rem',
      '--bs-btn-font-size': '1rem', 
    };

    if (this.state.status) {
      return (
        <Navigate to="/home" alert="Personaje Creado correctamente" />
      );
    } else {
      return (
        <div className="container py-4">
          <h1 className="text-center fw-bold mb-4">Crear Personaje</h1>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              ref={this.cajaNombre}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <input
              type="text"
              className="form-control"
              id="imagen"
              ref={this.cajaImagen}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serie" className="form-label">Serie</label>
            <select
              className="form-select"
              id="serie"
              ref={this.cajaSerie}
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
            <button onClick={this.insertPersonaje} className="btn btn-primary btn-lg" style={customButtonStyle} alert="Personaje creado correctamente">
              Crear Personaje
            </button> &nbsp;
            <NavLink to={"/personajes"} className="btn btn-secondary">Volver</NavLink>
          </div>
        </div>
      );
    }
  }
}
