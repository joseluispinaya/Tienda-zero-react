import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../../Screens/Home.jsx'
import Categoria from '../../Screens/Categoria.jsx';
import Product from '../../Screens/Product.jsx'
import About from '../../Screens/About.jsx'
import Inicio from '../../Screens/Inicio.jsx';
import Login from '../../Screens/Login.jsx';
import ProtectedRoute from "../ProtectedRoute.jsx";


//import { Routes, Route } from 'react-router'

const Router = () => {
    return (
        <Routes>

            {/* RUTA LOGIN (PÚBLICA) */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<Login />} />

            {/* RUTAS PROTEGIDAS */}
            <Route
                index
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="categorias"
                element={
                    <ProtectedRoute>
                        <Categoria />
                    </ProtectedRoute>
                }
            />

            <Route
                path="products"
                element={
                    <ProtectedRoute>
                        <Product />
                    </ProtectedRoute>
                }
            />

            <Route
                path="about"
                element={
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                }
            />

            {/* Cualquier ruta NO existente → redirige a Home */}
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
};

export default Router