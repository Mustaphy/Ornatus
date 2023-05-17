import { useRef } from 'react';
import Button from '../../components/Button/Button';
import Typewriter from '../../components/Typewriter/Typewriter';
import './Home.css'

function Home() {
  const elements = useRef([
    { id: 1, name: 'Button', path: 'button' }
  ]);
  const textsToType = useRef([
    'buttons'
  ]);

  return (
    <>
      <div id="welcome-section">
        <div id="welcome-text">
          <h1>Styleface</h1>
          <Typewriter
            staticText="Your user-friendly user interface to design and generate HTML/CSS code for "
            textsToType={textsToType.current}
        />
        </div>
        { /* Source: https://publicdomainvectors.org/en/free-clipart/Guy-working-with-a-laptop/90490.html */ }
        <img id="welcome-image" src="src/assets/welcome-image.png" />
      </div>

      <div id="elements-section">
        {
          elements.current.map(element => <Button key={element.id} text={element.name} path={element.path}></Button>)
        }
      </div>
    </>
  )
}

export default Home;