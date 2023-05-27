import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ElementDesigner from './pages/ElementDesigner/ElementDesigner';
import NavigationBar from './components/NavigationBar/NavigationBar';

const BASE_URL = "/Styleface";

function App() {
  const navigationLinks = [
    { id: 1, name: 'Element Designer', path: `${BASE_URL}/element-designer` },
  ];

  return (
    <>
      <header>
        <NavigationBar navigationLinks={navigationLinks} />
      </header>
      <Routes>
        <Route path={BASE_URL} element={<Home />}></Route>
        <Route path={`${BASE_URL}/element-designer`} element={<ElementDesigner />}></Route>
      </Routes>
    </>
  )
}

export default App;
