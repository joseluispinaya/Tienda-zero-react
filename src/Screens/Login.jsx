import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { saveAuth } from "../Store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!correo || !clave) {
            Swal.fire("Campos vacíos", "Completa todos los campos", "warning");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("https://localhost:7111/api/Acceso/LogeoApp", {
                correo: correo,
                clave: clave
            });

            console.log(response.data);

            const { token, usuarioResp } = response.data;

            saveAuth(token, usuarioResp);

            //const { token } = response.data;

            // Guarda el token JWT
            //localStorage.setItem("token", token);

            Swal.fire({
                title: "Bienvenido",
                text: "Has iniciado sesión correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            // Redirigir según tu router
            navigate("/");

        } catch (error) {
            console.log(error);

            if (error.response?.status === 400) {
                Swal.fire("Credenciales incorrectas", "Correo o contraseña inválidos", "error");
            } else {
                Swal.fire("Error", "No se pudo conectar con el servidor", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="card shadow p-4" style={{ width: "380px" }}>
                <h3 className="text-center mb-4">Iniciar Sesión</h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Ingrese su correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Validando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login