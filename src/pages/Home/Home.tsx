import Button from '../../components/Button/Button';
import Typewriter from '../../components/Typewriter/Typewriter';
import designingImage from '../../assets/designing-image.png';
import './Home.css'

function Home() {
  const elements = [
    { id: 1, name: '<button>', path: 'element-designer' }
  ];
  const textsToType = [
    'buttons'
  ];

  return (
    <>
      <div id="welcome-section">
        <div id="welcome-text">
          <h1>Styleface</h1>
          <h2>
            Your user-friendly user interface to design and generate HTML and CSS code for <Typewriter textsToType={textsToType} />
          </h2>
        </div>

        { /* Source: https://publicdomainvectors.org/en/free-clipart/Graphic-designer/90584.html */ }
        <div id="welcome-image-container">
          <img src={designingImage} alt="Man holding a laptop" />
        </div>
      </div>

      <div id="elements-section">
        <h2>Choose an element to design</h2>
        <p>We currently only support buttons</p>
        
        <div id="elements">
          {
            elements.map(element => <Button key={element.id} text={element.name} path={element.path}></Button>)
          }
        </div>
      </div>
    </>
  )
}

export default Home;