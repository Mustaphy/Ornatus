import Button from '../../components/Button/Button';
import Typewriter from '../../components/Typewriter/Typewriter';
import designingImage from '../../assets/designing-image.png';
import './Home.css'

function Home() {
  const textsToType = [
    '<button>', '<input>', '<div>', '<p>'
  ];

  return (
    <>
      <div id="welcome-section">
        <div id="welcome-text">
          <h1>Ornatus</h1>
          <em>Latin for 'decorated'</em>
          <p>
            Your user-friendly user interface to design and generate HTML and CSS code for elements,
            such as <Typewriter textsToType={textsToType} />
          </p>

          <Button text="Start designing!" path="element-designer" />
        </div>

        { /* Source: https://publicdomainvectors.org/en/free-clipart/Graphic-designer/90584.html */ }
        <div id="welcome-image-container">
          <img src={designingImage} alt="Man holding a laptop" />
        </div>
      </div>
    </>
  )
}

export default Home;