import React, { useEffect, useState, useRef } from 'react';
import DivAdd from "../Components/Forms/DivAdd";
import DivTable from "../Components/Forms/DivTable";
import DivSelect from "../Components/Forms/DivSelect";
import ModalAdd from "../Components/Modals/ModalAdd";
//import ModalAdd from "../Components/Modals/ModalAdd";
import { productosApi } from "../Api/productosApi";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Product = () => {
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [operation, setOperation] = useState('');
    const [classLoad, setClassLoad] = useState('');
    const [classTable, setClassTable] = useState('d-none');
    const [title, setTitle] = useState('');
    const close = useRef();
    //const [categorias, setCategorias] = useState([]);
    //const [precioVenta, setPrecioVenta] = useState('');
    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        const data = await productosApi.listar();
        console.log(data);
        setProductos(data);
        setClassTable('');
        setClassLoad('d-none');
        //setClassLoad('d-none');
    };

    const clear = () => {
        setNombre('');
        setDescripcion('');
        setCantidad('');
        setPrecioCompra('');
        setPrecioVenta('');
        setIdCategoria(1);
    };

    const openModal = () => {
        setTitle('Modal producto');
        //setClassLoad('d-none');
    };

    const save = (e) => {
        e.preventDefault();
        //setClassLoad('d-none');
    };


    return (
        <div className="container-fluid">
            <DivAdd>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProductos" onClick={() => openModal()}>
                    <i className="fas fa-user-plus"></i> Nuevo Registro
                </button>
            </DivAdd>
            <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
                <table className="table table-bordered">
                    <thead><tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th></th>
                        <th></th>
                    </tr></thead>
                    <tbody className="table-group-divider">
                        {productos.map((row, i) => (
                            <tr key={row.idProducto}>
                                <td>{(i + 1)}</td>
                                <td>{row.nombre}</td>
                                <td>{row.descripcion}</td>
                                <td>{row.nombreCategoria}</td>
                                <td>{row.precioVenta}</td>
                                <td>
                                    <img
                                        src={`https://localhost:7111${row.imageFull}`}
                                        alt="Producto"
                                        className="img-thumbnail"
                                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-warning">
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DivTable>
            <ModalAdd title={title} modal='modalProductos'>
                <div className="modal-body">
                    <form onSubmit={save}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-Nombre">Nombre</span>
                            <input type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-Nombre" />
                        </div>
                        <div className="d-grid col-10 mx-auto">
                            <button type="submit" className="btn btn-primary mb-3"><i className="fa-solid fa-save"></i> Guardar</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                </div>
            </ModalAdd>
        </div>
    );
};

export default Product;