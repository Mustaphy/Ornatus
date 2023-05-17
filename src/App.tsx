import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import ButtonDesigner from './pages/ButtonDesigner/ButtonDesigner'

function App() {
  const BASE_URL = "/Styleface"

  return (
    <>
      <Routes>
        <Route path={BASE_URL} element={<Home />}></Route>
        <Route path={`${BASE_URL}/button`} element={<ButtonDesigner />}></Route>
      </Routes>
    </>
  )
}

export default App;
