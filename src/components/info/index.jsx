import './Style.css'

const momo = 'https://vignette.wikia.nocookie.net/avatar/images/4/43/Inquisitive_Momo.png/revision/latest?cb=20081225191217'

const elementos = [
  { nombre: 'Agua', clase: 'agua' },
  { nombre: 'Tierra', clase: 'tierra' },
  { nombre: 'Fuego', clase: 'fuego' },
  { nombre: 'Aire', clase: 'aire' },
]

function Info() {
  return (
    <div className="c-info">
      <div className="c-info-cielo">
        <div className="c-info-estrellas"></div>
        <div className="c-info-sol"></div>
        <div className="c-info-nube uno"></div>
        <div className="c-info-nube dos"></div>
        <div className="c-info-nube tres"></div>
        <div className="c-info-montanas lejanas"></div>
        <div className="c-info-montanas cercanas"></div>
      </div>

      <div className="c-info-contenido">
        <div className="c-info-elementos">
          {elementos.map((elemento) => (
            <span key={elemento.nombre} className={`c-info-elemento ${elemento.clase}`}>
              {elemento.nombre}
            </span>
          ))}
        </div>

        <h1 className="c-info-titulo">AVATAR</h1>
        <p className="c-info-subtitulo">La leyenda de Aang</p>
        <p className="c-info-autor">Diego Esteban Mahecha Reyes</p>

        <div className="c-info-momo">
          <img src={momo} alt="Momo" />
        </div>
        <p className="c-info-momeza">MOMO</p>

        <div className="c-info-medidor">
          <p>Nivel de momeza</p>
          <div className="c-info-barra">
            <div className="c-info-barra-relleno"></div>
          </div>
          <p className="c-info-medidor-valor">Máximo</p>
        </div>

        <div className="c-info-caja">
          <p className="c-info-caja-titulo">Momo</p>
          <p>
            Lémur alado del Templo Aire del Sur y fiel compañero de Aang.
            Experto en robar fruta y en meterse donde no lo llaman.
          </p>
        </div>

        <div className="c-info-caja">
          Api con información de los personajes del mundo de Avatar
        </div>

        <a className="c-info-link" href="https://github.com/Demalord" target="_blank" rel="noreferrer">
          github.com/Demalord
        </a>
        <p className="c-info-version">v 1.0.1</p>
      </div>
    </div>
  )
}

export default Info
