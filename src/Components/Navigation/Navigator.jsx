import { Link } from "react-router";

const Navigator = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <a className="navbar-brand fw-bold" href="#">
                <i className="fa-solid fa-paw me-2"></i>
                MiProyecto
            </a>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">

                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/products" className="nav-link">Productos</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fa-solid fa-user"></i> Cuenta
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navigator