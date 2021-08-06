import { HashLink as Link } from "react-router-hash-link";

function Navigation(props) {
  let { isFixed = true } = props;

  return (
    <nav
      id="menu"
      className={`navbar navbar-default navbar-expand-sm navbar-light ${
        isFixed ? "fixed-top" : ""
      }`}
    >
      <Link className="navbar-brand page-scroll" to="/#page-top">
        IDoctor
      </Link>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item  ">
            <Link to="/#features" className=" nav-link page-scroll">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#about" className="nav-link page-scroll">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#services" className="nav-link page-scroll">
              Services
            </Link>
          </li>
          {/* <li className="nav-item">
              <a href="#portfolio" className="nav-link page-scroll">
                Gallery
              </a>
            </li> */}
          <li className="nav-item">
            <Link to="/#testimonials" className="nav-link page-scroll">
              Testimonials
            </Link>
          </li>
          {/* <li className="nav-item">
              <a href="#team" className="nav-link page-scroll">
                Team
              </a>
            </li> */}
          <li className="nav-item">
            <Link to="/#contact" className=" nav-link page-scroll">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
