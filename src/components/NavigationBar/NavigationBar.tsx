import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { NavigationBarProperties } from "./NavigationBarInterfaces";
import { useScrolledDown } from "../../hooks/useScrolledDown";

function NavigationBar(props: NavigationBarProperties) {
  const scrolledDown = useScrolledDown();

  return (
    <>
      <div className={`styleface-navigation-bar ${scrolledDown ? "sticky" : ""}`}>
        <Link id="navigation-name" to={"/Styleface"}>Styleface</Link>
        <nav>
          <ul id="navigation-links">
            {
              props.navigationLinks.map(navigationLink =>
                <li key={navigationLink.id}>
                  <Link className="navigation-link" to={navigationLink.path}>
                    <p className="navigation-text">{navigationLink.name}</p>
                  </Link>
                </li>
              )
            }
          </ul>
        </nav>
      </div>

      <div className="styleface-navigation-bar filler"></div>
    </>
);
}

export default NavigationBar;