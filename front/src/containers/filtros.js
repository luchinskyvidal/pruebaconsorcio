import React from 'react'
import Filtro from '../components/filtro' 


class Filter extends React.Component {

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

            <div >
                <Filtro></Filtro>
            </div>

        </div>
        );

 }
}



export default Filter 