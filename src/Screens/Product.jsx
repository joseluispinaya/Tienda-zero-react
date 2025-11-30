import React, { useEffect, useState, useRef } from 'react';
import DivAdd from "../Components/Forms/DivAdd";
import DivTable from "../Components/Forms/DivTable";
import DivSelect from "../Components/Forms/DivSelect";
import ModalAdd from "../Components/Modals/ModalAdd";
//import ModalAdd from "../Components/Modals/ModalAdd";
import { productosApi } from "../Api/productosApi";
import Swal from "sweetalert2";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Product = () => {
    const [productos, setProductos] = useState([]);

    const [idProducto, setIdProducto] = useState(0);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precioCompra, setPrecioCompra] = useState("");
    const [precioVenta, setPrecioVenta] = useState("");
    const [idCategoria, setIdCategoria] = useState(1);
    const [categorias, setCategorias] = useState([]);

    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null); // NUEVO

    const [operation, setOperation] = useState(1); // 1=registrar, 2=editar
    const [classLoad, setClassLoad] = useState("");
    const [classTable, setClassTable] = useState("d-none");
    const [title, setTitle] = useState("");

    const close = useRef();
    const fileInputRef = useRef();
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
        setIdProducto(0);
        setNombre("");
        setDescripcion("");
        setCantidad("");
        setPrecioCompra("");
        setPrecioVenta("");
        setIdCategoria(1);
        setFoto(null);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const openModal = async (op, product = null) => {
        clear();
        setOperation(op);

        // Cargar categorías
        const dataCat = await productosApi.listarCategorias();
        setCategorias(dataCat);

        if (op === 1) {
            setTitle("Registrar producto");
        } else {
            setTitle("Editar producto");
            console.log(product);

            setIdProducto(product.idProducto);
            setNombre(product.nombre);
            setDescripcion(product.descripcion);
            setCantidad(product.cantidad);
            setPrecioCompra(product.precioCompra);
            setPrecioVenta(product.precioVenta);
            setIdCategoria(product.idCategoria);

            // Vista previa de imagen actual
            setPreview(`https://localhost:7111${product.imageFull}`);
        }
    };

    const save = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !descripcion.trim()) {
            Swal.fire("Campos vacíos", "Completa todos los campos", "warning");
            return;
        }

        const modelo = {
            idProducto,
            nombre,
            descripcion,
            cantidad: Number(cantidad),
            precioCompra: Number(precioCompra),
            precioVenta: Number(precioVenta),
            idCategoria,
        };

        const formData = new FormData();
        formData.append("modelo", JSON.stringify(modelo));

        if (foto !== null) {
            formData.append("foto", foto);
        }

        let response;

        if (operation === 1) {
            response = await productosApi.guardar(formData);
        } else {
            response = await productosApi.editar(formData);
        }

        if (response.estado) {
            Swal.fire("Mensaje", response.mensaje, "success");
            close.current.click();
            getProductos();
        } else {
            Swal.fire("Error", response.mensaje, "error");
        }
    };


    return (
        <div className="container-fluid">
            <DivAdd>
                <button className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#modalProductos" onClick={() => openModal(1)}>
                    <i className="fa-solid fa-circle-plus"></i> Nuevo Registro
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
                                    <button
                                        className="btn btn-warning me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalProductos"
                                        onClick={() => openModal(2, row)}
                                    >
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DivTable>
            <ModalAdd title={title} modal="modalProductos" size="modal-lg">
                <div className="modal-body">
                    <form onSubmit={save}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Nombre</span>
                                    <input type="text" className="form-control" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Categorías</span>
                                    <select
                                        className="form-select"
                                        value={idCategoria}
                                        onChange={(e) => setIdCategoria(e.target.value)}
                                    >
                                        {categorias.map((cat) => (
                                            <option key={cat.idCategoria} value={cat.idCategoria}>
                                                {cat.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Cantidad Total</span>
                                    <input type="number" className="form-control" value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)} />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Precio Compra Bs</span>
                                    <input type="number" className="form-control" value={precioCompra}
                                        onChange={(e) => setPrecioCompra(e.target.value)} />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Precio Venta Bs</span>
                                    <input type="number" className="form-control" value={precioVenta}
                                        onChange={(e) => setPrecioVenta(e.target.value)} />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Descripción</span>
                                    <input type="text" className="form-control" value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                
                                <div className="mb-3">
                                    <label className="form-label">Seleccione Imagen</label>
                                    <input type="file" className="form-control form-control-sm" accept="image/*" ref={fileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFoto(file);
                                            if (file) setPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>

                                {preview && (
                                    <div className="text-center">
                                        <img
                                            src={preview}
                                            alt="Vista previa"
                                            className="img-thumbnail mt-2"
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                        />
                                    </div>
                                )}

                                <div className="d-grid col-8 mx-auto mt-3">
                                    <button type="submit" className="btn btn-primary btn-sm mb-3">
                                        <i className="fa-solid fa-save"></i> Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>
                        Cancelar
                    </button>
                </div>
            </ModalAdd>
        </div>
    );
};

export default Product;