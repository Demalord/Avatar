import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Inicio from './components/inicio'
import Personaje from './components/personaje'
import Favoritos from './components/favoritos'
import Info from './components/info'
import Coleccion from './components/coleccion'

function App() {
  return (
    <Router>
      <nav className='c-menu'>
        <Link to='/'>Inicio</Link>
        <Link to='/coleccion'>Coleccion</Link>
        <Link to='/favoritos'>Favoritos</Link>
        <Link to='/info'>Info</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/coleccion' element={<Coleccion />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/info' element={<Info />} />
        <Route path='/personaje/:id' element={<Personaje />} />
      </Routes>
    </Router>
  )
}

export default App
