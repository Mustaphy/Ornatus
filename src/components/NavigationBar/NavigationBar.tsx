import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { NavigationBarProperties } from "./NavigationBarTypes";
import { useScrolledDown } from "../../hooks/useScrolledDown";

function NavigationBar({navigationLinks}: NavigationBarProperties) {
  const scrolledDown = useScrolledDown();

  return (
    <>
      <div className={`styleface-navigation-bar ${scrolledDown ? "sticky" : ""}`}>
        <Link id="navigation-name" to={"/Styleface"}>Styleface</Link>
        <nav>
          <ul id="navigation-links">
            {
              navigationLinks.map((navigationLink, index) =>
                <li key={index}>
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