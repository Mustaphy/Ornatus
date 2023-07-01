import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ElementDesigner from './pages/ElementDesigner/ElementDesigner';
import NavigationBar from './components/NavigationBar/NavigationBar';

const BASE_URL = "/Ornatus";

function App() {
  const navigationLinks = [
    { name: 'Element Designer', path: `${BASE_URL}/element-designer` },
  ];

  return (
    <>
      <header>
        <NavigationBar navigationLinks={navigationLinks} />
      </header>

      <main>
        <Routes>
          <Route path={BASE_URL} element={<Home />}></Route>
          <Route path={`${BASE_URL}/element-designer`} element={<ElementDesigner />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App;
