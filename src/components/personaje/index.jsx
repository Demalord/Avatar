import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import './Style.css'


function Personaje() {
  const { id } = useParams();
  const [datapersonaje, setDatapersonaje] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });
  const esFavorito = favoritos.some(p => p.id === datapersonaje?._id);
  useEffect(() => {
    fetch(`https://last-airbender-api.fly.dev/api/v1/characters/${id}`)
      .then(response => response.json())
      .then(responseData => setDatapersonaje(responseData))
      .catch(error => console.error("Error:", error));
  }, [id]);

  const toggleFavorito = () => {
    let nuevosFavoritos;
    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(p => p.id !== datapersonaje._id);
    } else {
      nuevosFavoritos = [...favoritos, { id: datapersonaje._id, nombre: datapersonaje.name, foto: datapersonaje.photoUrl }];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (!datapersonaje || !datapersonaje._id) return <p>Cargando...</p>;
  return (
    <div className="seleccionado">
      <h1>{datapersonaje.name}</h1>
      {datapersonaje.photoUrl && (
        <img
          src={datapersonaje.photoUrl}
          alt={datapersonaje.name}
          width="200"
        />
      )}

      {datapersonaje.affiliation && <p>Afiliación: {datapersonaje.affiliation}</p>}
      {datapersonaje.gender && <p>Género: {datapersonaje.gender}</p>}
      {datapersonaje.eye && <p>Ojos: {datapersonaje.eye} / Cabello: {datapersonaje.hair} / Piel: {datapersonaje.skin}</p>}
      {datapersonaje.weapon && <p>Arma: {datapersonaje.weapon}</p>}
      {datapersonaje.profession && <p>Profesión: {datapersonaje.profession}</p>}
      {datapersonaje.position && <p>Posición: {datapersonaje.position}</p>}
      {datapersonaje.predecessor && <p>Predecesor: {datapersonaje.predecessor}</p>}
      {datapersonaje.love && <p>Amor: {datapersonaje.love}</p>}
      {datapersonaje.allies?.length > 0 && <p>Aliados: {datapersonaje.allies.join(', ')}</p>}
      {datapersonaje.enemies?.length > 0 && <p>Enemigos: {datapersonaje.enemies.join(', ')}</p>}
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  )

}

export default Personaje
