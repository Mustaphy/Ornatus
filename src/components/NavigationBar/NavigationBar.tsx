import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { NavigationBarProperties } from "./NavigationBarTypes";
import { useScrolledDown } from "../../hooks/useScrolledDown";

function NavigationBar({navigationLinks}: NavigationBarProperties) {
  const scrolledDown = useScrolledDown();

  return (
    <>
      <div className={`ornatus-navigation-bar ${scrolledDown ? "sticky" : ""}`}>
        <Link id="navigation-name" to={"/Ornatus"}>Ornatus</Link>
        <nav>
          <ul id="navigation-links">
            {
              navigationLinks.map((navigationLink, index) =>
                <li key={index}>
                  <Link className="navigation-text" to={navigationLink.path}>
                    {navigationLink.name}
                  </Link>
                </li>
              )
            }
          </ul>
        </nav>
      </div>

      <div className="ornatus-navigation-bar filler"></div>
    </>
);
}

export default NavigationBar;