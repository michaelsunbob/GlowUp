import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Routines from './pages/Routines'
import Products from './pages/Products'
import Recommendations from './pages/Recommendations'
import Account from './pages/Account'
import Register from './pages/Register'

function App() {
  return (
    <div className="App" style={{backgroundColor: '#F2E4DA'}}>
      <Navbar />
      <div >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/routines' element={<Routines />} />
          <Route path='/products' element={<Products />} />
          <Route path='/recommendations' element={<Recommendations />} />
          <Route path='/account' element={<Account />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;