import Home from '../../Screens/Home.jsx'
import Product from '../../Screens/Product.jsx'
import About from '../../Screens/About.jsx'
import Login from '../../Screens/Login.jsx';

import { Routes, Route } from 'react-router'

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path='products' element={<Product />} />
            <Route path='about' element={<About />} />
        </Routes>
    )
}

export default Router