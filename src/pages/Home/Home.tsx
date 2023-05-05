import Button from '../../components/Button/Button';
import { Element } from './home-types'
import './Home.css'

function Home() {
  const elements: Element[] = [
    { id: 1, name: "Button", path: "button" }
  ];

  return (
    <>
      <div id="elements">
        {
          elements.map(element => <Button key={element.id} text={element.name} path={element.path}></Button>)
        }
      </div>
    </>
  )
}

export default Home;