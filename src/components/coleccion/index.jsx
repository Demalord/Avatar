import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function crearPregunta(personajes, coleccion) {
  const disponibles = personajes.filter((p) => !coleccion.some((c) => c.id === p._id));
  const base = disponibles.length > 0 ? disponibles : personajes;
  const correcto = base[Math.floor(Math.random() * base.length)];

  const opciones = [correcto];
  while (opciones.length < 4) {
    const otro = personajes[Math.floor(Math.random() * personajes.length)];
    if (!opciones.some((o) => o.name === otro.name)) {
      opciones.push(otro);
    }
  }

  const posicion = Math.floor(Math.random() * 4);
  opciones.splice(0, 1);
  opciones.splice(posicion, 0, correcto);

  return { correcto, opciones };
}

function leerColeccion() {
  try {
    const guardados = JSON.parse(localStorage.getItem('coleccionAvatar') || '[]');
    return Array.isArray(guardados) ? guardados.filter((p) => p && p.id && p.nombre) : [];
  } catch {
    return [];
  }
}

function Coleccion() {
  const navigate = useNavigate();
  const [personajes, setPersonajes] = useState([]);
  const [pregunta, setPregunta] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [racha, setRacha] = useState(0);
  const [coleccion, setColeccion] = useState(leerColeccion);

  useEffect(() => {
    fetch('https://last-airbender-api.fly.dev/api/v1/characters?perPage=500')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const conFoto = datos.filter((p) => p.photoUrl);
        setPersonajes(conFoto);
        setPregunta(crearPregunta(conFoto, leerColeccion()));
      })
      .catch((error) => console.error('Error al cargar personajes:', error));
  }, []);

  const responder = (opcion) => {
    if (respuesta) return;
    setRespuesta(opcion);

    if (opcion._id === pregunta.correcto._id) {
      setRacha(racha + 1);
      const yaLoTiene = coleccion.some((c) => c.id === opcion._id);
      if (!yaLoTiene) {
        const nuevaColeccion = [...coleccion, { id: opcion._id, nombre: opcion.name, foto: opcion.photoUrl }];
        setColeccion(nuevaColeccion);
        localStorage.setItem('coleccionAvatar', JSON.stringify(nuevaColeccion));
      }
    } else {
      setRacha(0);
    }
  };

  const siguiente = () => {
    setRespuesta(null);
    setPregunta(crearPregunta(personajes, coleccion));
  };

  const claseOpcion = (opcion) => {
    if (!respuesta) return 'coleccion-opcion';
    if (opcion._id === pregunta.correcto._id) return 'coleccion-opcion correcta';
    if (opcion._id === respuesta._id) return 'coleccion-opcion incorrecta';
    return 'coleccion-opcion';
  };

  if (!pregunta) return <p className="coleccion-cargando">Cargando...</p>;

  const acerto = respuesta && respuesta._id === pregunta.correcto._id;

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">¿Quién es ese personaje?</h1>

      <div className="coleccion-marcador">
        <p>Colección: <strong>{coleccion.length}</strong> / {personajes.length}</p>
        <p>Racha: <strong>{racha}</strong></p>
      </div>

      <div className="coleccion-foto">
        <img
          className={respuesta ? '' : 'oculta'}
          src={pregunta.correcto.photoUrl}
          alt={respuesta ? pregunta.correcto.name : '¿Quién es?'}
        />
      </div>

      <div className="coleccion-opciones">
        {pregunta.opciones.map((opcion) => (
          <button
            type="button"
            key={opcion._id}
            className={claseOpcion(opcion)}
            onClick={() => responder(opcion)}
          >
            {opcion.name}
          </button>
        ))}
      </div>

      {respuesta && (
        <div className={acerto ? 'coleccion-mensaje bien' : 'coleccion-mensaje mal'}>
          {acerto
            ? `¡Correcto! ${pregunta.correcto.name} se unió a tu colección.`
            : `¡Fallaste! Era ${pregunta.correcto.name}.`}
        </div>
      )}

      {respuesta && (
        <button type="button" className="coleccion-siguiente" onClick={siguiente}>
          Siguiente
        </button>
      )}

      <h2 className="coleccion-subtitulo">Tu colección</h2>
      {coleccion.length === 0 ? (
        <p className="coleccion-vacia">Adivina personajes para empezar tu colección.</p>
      ) : (
        <section className="coleccion-album">
          {coleccion.map((personaje) => (
            <div
              key={personaje.id}
              className="coleccion-personaje"
              onClick={() => navigate(`/personaje/${personaje.id}`)}
            >
              <img src={personaje.foto} alt={personaje.nombre} loading="lazy" />
              <p>{personaje.nombre}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default Coleccion;
