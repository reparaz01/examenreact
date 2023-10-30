import React, { Component } from 'react';
import series from '../assets/images/series.jpg'; 

export default class Home extends Component {
  render() {
    return (
      <div>
        <img src={series} alt="Imagen de fondo" style={{ width: '100%', height: '100vh', objectFit: 'cover'}}
        />
      </div>
    );
  }
}