import { Link } from "react-router-dom";

interface ComponentProps {}

export function Navbar({}: ComponentProps) {
  return (
    <nav className="has-background-primary">
      <div className="navbar-brand">
        <div className="navbar-item is-flex-grow-1">
          <Link className="button is-light is-outlined is-small" to="/">
            &#8592; Start
          </Link>
        </div>
        <div className="navbar-item">
          <Link
            className="button is-small is-rounded is-light is-outlined"
            to="/workshop"
          >
            New Workshop
          </Link>
        </div>
      </div>
    </nav>
  );
}
