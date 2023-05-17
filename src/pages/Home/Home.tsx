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
      <div id="title">
        <h1>Styleface</h1>
        <Typewriter
          staticText="Your user interface to design "
          textsToType={textsToType.current}
        />
      </div>

      <div id="elements">
        {
          elements.current.map(element => <Button key={element.id} text={element.name} path={element.path}></Button>)
        }
      </div>
    </>
  )
}

export default Home;