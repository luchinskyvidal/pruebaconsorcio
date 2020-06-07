import React from 'react'
import Respuesta from '../components/Respuesta' 


class Result extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {

        
    }
    render(){
        return(
        <div className="container">
            <div className="row">
                <Respuesta />
            </div>

        </div>
        );

       
 }
} 



export default Result 