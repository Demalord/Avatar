import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('favoritos') || '[]');
      return Array.isArray(guardados) ? guardados.filter(p => p && p.id && p.nombre) : [];
    } catch {
      return [];
    }
  });

  return (
    <>
      <h1 className="c-favoritos-titulo">Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="c-favoritos-vacio">
          Aún no tienes favoritos. Entra a un personaje y pulsa 🤍 para guardarlo.
        </p>
      ) : (
        <div className="c-lista">
          {favoritos.map((personaje) => (
            <div
              key={personaje.id}
              className="c-lista-personaje"
              onClick={() => navigate(`/personaje/${personaje.id}`)}
            >
              <p>{personaje.nombre}</p>
              {personaje.foto && (
                <img
                  src={personaje.foto}
                  alt={`Personaje ${personaje.nombre}`}
                  width="auto"
                  height="60"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Favoritos
