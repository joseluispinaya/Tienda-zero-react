import React, { useEffect, useState, useRef } from 'react';
import DataTable from "react-data-table-component";
import DivAdd from "../Components/Forms/DivAdd";
import DivConten from "../Components/Forms/DivConten";
//import DivTable from "../Components/Forms/DivTable";
import ModalAdd from "../Components/Modals/ModalAdd";
import { categoriasApi } from "../Api/categoriasApi";
import { exportToExcel, exportToPDF } from "../Utils/exportUtils";
import { showAlert, showToast } from "../Utils/alertUtils";

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [filtered, setFiltered] = useState([]); // para el buscador

    const [idCategoria, setIdCategoria] = useState(0);
    const [nombre, setNombre] = useState("");
    const [activo, setActivo] = useState(true);

    const [operation, setOperation] = useState(1); // 1=registrar, 2=editar
    //const [classLoad, setClassLoad] = useState("");
    //const [classTable, setClassTable] = useState("d-none");
    const [title, setTitle] = useState("");

    const close = useRef();

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        const data = await categoriasApi.listar();
        setCategorias(data);
        //setClassTable('');
        //setClassLoad('d-none');
        setFiltered(data); // copia inicial del listado para búsqueda
    };

    const clear = () => {
        setIdCategoria(0);
        setNombre("");
        setActivo(true);
    };

    const openModal = async (op, catego = null) => {
        clear();
        setOperation(op);

        if (op === 1) {
            setTitle("Registrar categoria");
        } else {
            setTitle("Editar categoria");

            setIdCategoria(catego.idCategoria);
            setNombre(catego.nombre);
            setActivo(catego.activo);
        }
    };

    const save = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            showToast("Ingrese un nombre", "error");
            return;
        }

        const objeto = { idCategoria, nombre, activo };

        let response;

        if (operation === 1) {
            response = await categoriasApi.guardar(objeto);
        } else {
            response = await categoriasApi.editar(objeto);
        }

        if (response.estado) {
            showAlert("Mensaje", response.mensaje, "success");
            close.current.click();
            getCategorias();
        } else {
            showAlert("Error", response.mensaje, "error");
        }
    };

    // Búsqueda en tabla
    const onSearch = (text) => {
        if (!text) {
            setFiltered(categorias);
            return;
        }

        const result = categorias.filter((item) =>
            item.nombre.toLowerCase().includes(text.toLowerCase())
        );

        setFiltered(result);
    };

    // Columnas de la tabla
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "70px",
        },
        {
            name: "Nombre",
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Estado",
            cell: (row) => (
                <span
                    className={`badge ${row.activo ? "bg-success" : "bg-danger"
                        }`}
                >
                    {row.activo ? "Activo" : "Inactivo"}
                </span>
            ),
            width: "150px",
        },
        {
            name: "Acciones",
            cell: (row) => (
                <button
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCategoria"
                    onClick={() => openModal(2, row)}
                >
                    <i className="fa-solid fa-edit"></i>
                </button>
            ),
            width: "120px",
        },
    ];

    return (
        <div className="container-fluid">
            <DivAdd>
                <button className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#modalCategoria" onClick={() => openModal(1)}>
                    <i className="fa-solid fa-circle-plus"></i> Nuevo Registro
                </button>
            </DivAdd>
            <DivConten col="6" off="3">
                <div className="card">
                    <div className="card-header">
                        Categorias Registradas
                    </div>
                    <div className="card-body">
                        <div className="row text-center mb-3">
                            <div className="col-md-3">
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => exportToExcel(categorias, "Categorias")}
                                >
                                    <i className="fa-solid fa-file-excel"></i> Excel
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => exportToPDF(columns, categorias, "Categorias")}
                                >
                                    <i className="fa-solid fa-file-pdf"></i> PDF
                                </button>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="form-control"
                                        onChange={(e) => onSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={filtered}
                            pagination
                            highlightOnHover
                            dense
                            noDataComponent="No hay categorías registradas"
                        />
                    </div>
                </div>
            </DivConten>
            <ModalAdd title={title} modal="modalCategoria" size="modal-sm">
                <div className="modal-body">
                    <form onSubmit={save}>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Nombre</span>
                            <input type="text" className="form-control" value={nombre}
                                onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Estado</span>
                            <select
                                className="form-select"
                                value={activo ? "true" : "false"}
                                onChange={(e) => setActivo(e.target.value === "true")}
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div className="d-grid col-10 mx-auto">
                            <button type="submit" className="btn btn-primary btn-sm">
                                <i className="fa-solid fa-save"></i> Guardar
                            </button>
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
    )
}

export default Categoria
