import React,{Fragment,useEffect,useState} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';
function App() {
     //state del formulario
     const[busqueda,setBusqueda]= useState({
      ciudad:"",
      pais:""
  })
  const [consultar, guardarConsultar] = useState(false)
  const [resultado,guardarResultado] = useState({})
  const [error,guardarError] = useState(false)
  const {ciudad, pais}= busqueda;
  useEffect(() =>{
    const consultarApi = async()=>{
      if(consultar){
        const appId='da1b692210659daa2c86d19048f65430'
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false)

        //detecta si hubo resultados correctos en la consulta 
        if(resultado.cod === "404"){
          guardarError(true);
        }else {guardarError(false);}
      }
    } 
    consultarApi();
    //eslint-disable-next-line
  },[consultar])
  let componente; 
  if(error){
    componente = <Error mensaje="No hay resultados "/>
  }else {
    componente = <Clima resultado={resultado}/>
  }
  return (
    <Fragment>
      <Header
        titutlo ="Clima react app"
      />
      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'> 
          <div className='col m6 s12'><Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            guardarConsultar={guardarConsultar}
          /></div>
          <div className='col m6 s12'>
            {componente}
          </div>
          </div>
        </div>
      </div>
    </Fragment>
     );
}

export default App;
