import { useEffect, useState } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { NavigationBarProperties } from "./navigation-bar-types";

function NavigationBar(props: NavigationBarProperties) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {    
    const onScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className={`styleface-navigation-bar ${sticky ? "sticky" : ""}`}>
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