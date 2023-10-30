import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
  state = {
    serie: null,
    serieCargada: false,
  }

  loadSerie = () => {
    const url = Global.urlApi + "api/series/" + this.props.idSerie;

    axios.get(url)
      .then(response => {
        this.setState({
          serie: response.data,
          serieCargada: true
        });
      });
  }

  componentDidMount = () => {
    this.loadSerie();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.idSerie !== this.props.idSerie) {
      this.loadSerie();
    }
  }

  render() {
    if (!this.state.serie) {
      return <div>Cargando...</div>;
    }

    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <img
                src={this.state.serie.imagen}
                className="card-img-top"
                alt={this.state.serie.nombre}
                style={{ maxWidth: "600px" }}
              />
              <div className="card-body text-center">
              <br></br>
                <h5 className="card-title">{this.state.serie.nombre}</h5>
                <p className="card-text">IMBD:  {this.state.serie.puntuacion}</p>
                <div className="container">
                  <div className="row">
                    <div className="text-center">
                        <br></br>
                      <NavLink to={"/personajes/" + this.state.serie.idSerie + "/" + this.state.serie.nombre} className="btn btn-primary">Ver Personajes</NavLink>
                      &nbsp;
                      <NavLink to="/" className="btn btn-secondary">Volver</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
