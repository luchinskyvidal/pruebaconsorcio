import React from 'react'
import ReactDOM from 'react-dom'
import FIL from './containers/filtros'



const App = () => {
    return(
        <div>
            <div className="container">
                <FIL/>
            </div>
        </div>
        
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))