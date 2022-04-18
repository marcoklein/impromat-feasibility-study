import { NavLink } from "react-router-dom";

interface ComponentProps {}

export function Navbar({}: ComponentProps) {
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Home
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {/* <div className="buttons">
              <a className="button">New Workshop</a>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
