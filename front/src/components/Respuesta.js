import React from 'react'
import PropTypes from 'prop-types'

class Respuesta extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
  
    render() {
    if (this.props.nombre != undefined){
      return (
      <div>
        
          <h2>Informacion de la farmacia</h2>
          <h3>Nombre:   {this.props.nombre}</h3>
          <h3>Direcion: {this.props.direccion}</h3>
          <h3>Telefono: {this.props.telefono}</h3>
          <h3>Latitud:  {this.props.latitud}</h3>
          <h3>Longitud: {this.props.longitud}</h3>
        
      </div>
      );
        
      }
      return null
    }
    
    
}


Respuesta.protoTypes = {
  dataresultado: PropTypes.string
}
export default Respuesta 