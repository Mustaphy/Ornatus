import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ButtonDesigner from './pages/ButtonDesigner/ButtonDesigner';
import NavigationBar from './components/NavigationBar/NavigationBar';

const BASE_URL = "/Styleface";

function App() {
  const navigationLinks = [
    { id: 1, name: 'Button Designer', path: `${BASE_URL}/button` },
  ];

  return (
    <>
      <header>
        <NavigationBar navigationLinks={navigationLinks} />
      </header>
      <Routes>
        <Route path={BASE_URL} element={<Home />}></Route>
        <Route path={`${BASE_URL}/button`} element={<ButtonDesigner />}></Route>
      </Routes>
    </>
  )
}

export default App;
