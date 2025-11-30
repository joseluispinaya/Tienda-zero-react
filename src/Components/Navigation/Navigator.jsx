import { Link, useNavigate } from "react-router-dom";
import { getUsuario, clearAuth } from "../../Store/authStore";
//import { Link } from "react-router";

const Navigator = () => {
    const navigate = useNavigate();
    const usuario = getUsuario(); // obtenemos usuario desde store

    const handleLogout = () => {
        clearAuth();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <a className="navbar-brand fw-bold" href="#">
                <i className="fa-solid fa-paw me-2"></i>
                Tienda el Zero
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

                    {!usuario && (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </>
                    )}

                    {usuario && (
                        <>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/categorias" className="nav-link">Categorias</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Productos</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>

                            {/* MENÚ DE CUENTA */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="cuentaDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="fa-solid fa-user me-1"></i>
                                    {usuario.correo}
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cuentaDropdown">
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navigator