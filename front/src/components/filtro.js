import React from 'react'
import Respuesta from './Respuesta'

class Filtro extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value3: '',
        value4: '',
        value5: '',
        options: [],
        datareg: [],
        datacom: [],
        datafarm: [],
        dataresult: []
      };
  
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleChange4 = this.handleChange4.bind(this);
      this.handleChange5 = this.handleChange5.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    // MANEJADOR DE EVENTOS Y LLAMADAS A FUNCIONES
    handleChange3(event) {
        console.log(event.target.value)
        this.setState({value3: event.target.value});
        this.comunas(event.target.value);
      }
    handleChange4(event) {
        console.log(event.target.value)
        this.setState({value4: event.target.value});
        this.farmacias(event.target.value);
    }

    handleChange5(event) {
        console.log(event.target.value)
        this.setState({value5: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.result(this.state.value3, this.state.value4, this.state.value5);
      console.log(this.state.dataresult.local_nombre)
      

    }

    
    async componentDidMount() {
    //#region UN OBJETO CON LAS REGIONES, 
    var obj = 
        [
            {
            
                key: 15, 
                region: 'Región de Arica y Parinacota'  
            },
            {
            
                key: 1, 
                region: 'Región de Tarapacá'  
            },
            {
            
                key: 2, 
                region: 'Región de Antofagasta'  
            },
            {
            
                key: 3, 
                region: 'Región de Atacama'  
            },
            {
            
                key: 4, 
                region: 'Región de Coquimbo'  
            },
            {
            
                key: 5, 
                region: 'Región de Valparaíso'  
            },
            {
            
                key: 6, 
                region: 'Región del Libertador Gral. Bernardo O’Higgins'  
            },
            {
            
                key: 16, 
                region: 'Región de Ñuble'  
            },
            {
            
                key: 8, 
                region: 'Región del Biobío'  
            },
            {
            
                key: 9, 
                region: 'Región de la Araucanía'  
            },
            {
            
                key: 14, 
                region: 'Región de Los Ríos'  
            },
            {
            
                key: 10, 
                region: 'Región de Los Lagos'  
            },
            {
            
                key: 11, 
                region: 'Región Aisén del Gral. Carlos Ibáñez del Campo'  
            },
            {
            
                key: 12, 
                region: 'Región de Magallanes y de la Antártica Chilena'  
            },
            {
            
                key: 7, 
                region: 'Región Metropolitana de Santiago'  
            }
        ]
        this.setState({datareg: obj})

    //#endregion
        
    }
  
    // FUNCION QUE TRAE COMUNAS EN BASE A REGION
     async comunas(regionnumero) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones";
        
        var formData = new FormData();
    
        formData.append('reg_id', regionnumero);
        const res = await  fetch(proxyurl + url, {
            method: 'POST', 
            body: formData, // 
            })
        const resText = await res.text()

        // formar la respuesta para manipular el objeto correctamente
            var strin = "{value='82' name='ALHUE'},{value='83' name='CERRO NAVIA'}";
            var myobj = JSON.parse('{ "hello":"world" }');

        var respu = resText.slice(48, -9)
        var cad = respu.replace(/[^a-zA-Z0-9= ']/g, '');
        var cad2 = cad.replace(/[option]/g, '');
        var ar = cad2.replace(/ value='/g, '"value":&')
        var ar2 = ar.replace(/'/g, '","name":"')
        var ar3 = ar2.replace(/"value"/g, '"}%{"value"')
        var ar4 = ar3.slice(3).concat('"}')
        var ar5 = ar4.replace(/&/g, '"').split('%')
        
        var array = []
        ar5.forEach(comuna => {
            var myobj = JSON.parse(comuna);
            array.push(myobj)
        });
        this.setState({datacom: array})
        
    }

    // FUNCION QUE TRAE FARMACIAS EN BASE A UNA COMUNA
    async farmacias(farm) {
        const url = 'http://localhost:4000/buscar/comuna/'+ this.state.value3 +'/'+ farm +'';
        const res = await fetch(url, {mode: 'cors'})
        const resJSON = await res.json()
        
        console.log(resJSON.mes)
        if(resJSON.message == 'no se encuentran farmacias en la comuna'){
            alert(resJSON.message);
        }else
            this.setState({datafarm: resJSON})
        
    }

    // FUNCION QUE TRAE LOS RESULTADOS DE UNA FARMACIA EN BASE A COMUNA SELECCIONADA 
    async result(reg, com, loc){
        
        const url = 'http://localhost:4000/farmacia/'+ reg +'/'+ com +'/'+ loc +'';
        const res = await fetch(url, {mode: 'cors'})
        const resJSON = await res.json()
        this.setState({dataresult: resJSON})
        console.log(this.state.dataresult[0].local_nombre)
        
        
    }

   
    render() {
      return (
          <div className="col-md-4" >
              <div>
                    <form onSubmit={this.handleSubmit}>
                    
                        <select className="browser-default custom-select" value={this.state.value3} onChange={this.handleChange3 } >
                            <option value=''>Seleccione una region</option>{
                            this.state.datareg.map((reg) => {
                                return <option key={reg.key} value={reg.key}>{reg.region}</option>
                            })
                        }</select>

                        
                        <select className="browser-default custom-select" value={this.state.value4} onChange={this.handleChange4 }>
                            
                        
                            <option value=''>Seleccione una comuna</option>{
                            this.state.datacom.map((comuna) => {
                                return <option key={comuna.value} value={comuna.value}>{comuna.name}</option>
                            })
                        }</select>
                        
                        <select className="browser-default custom-select" value={this.state.value5} onChange={this.handleChange5 } >
                            <option value=''>Seleccione una farmacia</option>{
                            this.state.datafarm.map((farmacia) => {
                                return <option key={farmacia.local_id} value={farmacia.local_id}>{farmacia.local_nombre}</option>
                            })
                        }</select>
                    
                        <input type="submit" value="buscar" />
                    
                    </form>
                </div>

                <div>
                    {this.state.dataresult.map((farmaciadetalle) => 
                    <Respuesta 
                    nombre={farmaciadetalle.local_nombre}
                    direccion={farmaciadetalle.local_direccion}
                    telefono={farmaciadetalle.local_telefono}
                    latitud={farmaciadetalle.local_lat}
                    longitud={farmaciadetalle.local_lng}
                    key={farmaciadetalle.local_id}
                    />)}
                </div>
        


        
        </div>
      );
    }
}


  export default Filtro 