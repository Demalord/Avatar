import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './Style.css'

function Inicio() {

  const navigate = useNavigate();
  const [todoslospersonajes, setTodoslospersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [nacion, setNacion] = useState('All')


  let resultados = todoslospersonajes;
  if (busqueda.length >= 3 && isNaN(busqueda)){
    resultados=todoslospersonajes.filter(personaje => personaje.name.toLowerCase().includes(busqueda.toLowerCase()))
  }

    useEffect(() => {
    const cargarPersonajes = async () => {
      try {
        if (nacion === 'All') {
          const response = await fetch('https://last-airbender-api.fly.dev/api/v1/characters?perPage=500')
          const responseData = await response.json()
          setTodoslospersonajes(responseData ?? [])
          return
        }

        const response = await fetch(`https://last-airbender-api.fly.dev/api/v1/characters?affiliation=${nacion}&perPage=500`)
        const responseData = await response.json()
        setTodoslospersonajes(responseData ?? [])
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarPersonajes()
  }, [nacion])

  const naciones = [
    'All',
    'Air Nomads', 'Water Tribe', 'Earth Kingdom', 'Fire Nation',
    'Team Avatar', 'Spirit World', 'White Lotus'
  ]


  return (
    <>
      <div className="c-filtro">
        {naciones.map((unaNacion, index) => (
          <button type="button" key={index} onClick={() => setNacion(unaNacion)}>
            {unaNacion}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar Personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <div className="c-lista">
        {resultados.map((personaje) => (
          <div className='c-lista-personaje' key={personaje._id}
            onClick={() => navigate(`/personaje/${personaje._id}`)}
          >
            <p>{personaje.name}</p>
            {personaje.photoUrl && (
              <img src={personaje.photoUrl}
                alt={`Personaje ${personaje.name}`} width='auto' height='60' loading='lazy'
              />
            )}
          </div>
        ))}
      </div>
    </>

  )
}

export default Inicio
