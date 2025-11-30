import React, { useEffect, useState, useRef } from 'react';
import DivAdd from "../Components/Forms/DivAdd";
import DivTable from "../Components/Forms/DivTable";
import ModalAdd from "../Components/Modals/ModalAdd";
import { categoriasApi } from "../Api/categoriasApi";
import { showAlert, showToast } from "../Utils/alertUtils";

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);

    const [idCategoria, setIdCategoria] = useState(0);
    const [nombre, setNombre] = useState("");
    const [activo, setActivo] = useState(true);

    const [operation, setOperation] = useState(1); // 1=registrar, 2=editar
    const [classLoad, setClassLoad] = useState("");
    const [classTable, setClassTable] = useState("d-none");
    const [title, setTitle] = useState("");

    const close = useRef();

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        const data = await categoriasApi.listar();
        console.log(data);
        setCategorias(data);
        setClassTable('');
        setClassLoad('d-none');
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
            console.log(catego);

            setIdCategoria(catego.idCategoria);
            setNombre(catego.nombre);
            setActivo(catego.activo);
        }
    };

    const save = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            //showAlert("Alerta", "Ingrese un nombre", "warning");
            showToast("Ingrese un nombre", "error");
            //showToast("Producto agregado");
            //showToast("Ingrese un nombre", "error", "bottom-end");
            //showToast("Ingrese un nombre", "error");
            return;
        }

        const objeto = {
            idCategoria,
            nombre,
            activo,
        };

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

    return (
        <div className="container-fluid">
            <DivAdd>
                <button className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#modalCategoria" onClick={() => openModal(1)}>
                    <i className="fa-solid fa-circle-plus"></i> Nuevo Registro
                </button>
            </DivAdd>
            <DivTable col="6" off="3" classLoad={classLoad} classTable={classTable}>
                <table className="table table-bordered">
                    <thead><tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th></th>
                    </tr></thead>
                    <tbody className="table-group-divider">
                        {categorias.map((row, i) => (
                            <tr key={row.idCategoria}>
                                <td>{(i + 1)}</td>
                                <td>{row.nombre}</td>
                                <td>
                                    <span className={`badge ${row.activo ? "bg-success" : "bg-danger"}`}>
                                        {row.activo ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalCategoria"
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
