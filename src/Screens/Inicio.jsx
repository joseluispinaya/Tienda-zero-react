import React, { useState } from 'react';
import { showAlert, showTimedAlert, showConfirm, showToast, showLoading, closeLoading } from "../Utils/alertUtils";

const Inicio = () => {
    const [classLoad, setClassLoad] = useState("");
    const [classTable, setClassTable] = useState("d-none");

    const btnShow = (op) => {
        if (op === 1) {
            showAlert("Mensaje", "Contenido del mensaje", "success");
        } else if (op === 2) {
            showToast("Mensaje del toast", "error");
        } else if (op === 3) {
            showTimedAlert("Mensaje", "Contenido del mensaje", "success");
        } else if (op === 4) {
            handleConfirm();
        }

    };

    const btnShowLoading = () => {
        showLoading("Solicitando...");

        setTimeout(() => {
            closeLoading();
        }, 2000); // 2 segundos
    };

    const handleConfirm = () => {
        showConfirm(
            "¿Estás seguro?",
            "Esta acción no se puede deshacer",
            "warning",
            "Sí, continuar",
            "Cancelar"
        ).then((result) => {
            if (result.isConfirmed) {
                showToast("¡Acción confirmada!", "success");
            } else {
                showToast("Cancelado", "info");
            }
        });
    };

    const loadinCarga = () => {
        setClassTable('');
        setClassLoad('d-none');

        setTimeout(() => {
            setClassTable('d-none');
            setClassLoad('');
        }, 2000);
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-6">
                    <div className="card border border-dark mb-3">
                        <div className="card-header bg-dark border border-dark text-white">
                            Titulo del form
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-success" onClick={() => btnShow(1)}>Button showAlert</button>
                                </div>
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-danger" onClick={() => btnShow(3)}>Button showTimedAlert</button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-secondary" onClick={() => btnShow(4)}>Button showConfirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border border-primary mb-3">
                        <div className="card-header bg-primary border border-primary text-white">
                            Card Primary
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <button className="btn btn-success btn-sm" onClick={() => btnShow(2)}>
                                        <i className="fa-solid fa-bell"></i> Button showToast
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-danger btn-sm" onClick={btnShowLoading}>
                                        <i className="fa-solid fa-spinner"></i> Button showLoading
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-secondary btn-sm"><i className="fa-solid fa-ban"></i> Button sin uso</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <div className="card border border-dark mb-3">
                        <div className="card-header bg-dark border border-dark text-white">
                            Titulo del form
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <div className="d-grid mx-auto">
                                        <button className="btn btn-success btn-sm" onClick={loadinCarga}>
                                            <i className="fa-solid fa-file-pdf"></i> Button Alert2
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border border-primary mb-3">
                        <div className="card-header bg-primary border border-primary text-white">
                            Card Primary
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            <div className={`text-center ${classTable}`}>
                                <img src='/loadingze.gif' className='img-fluid' />
                            </div>
                            <div className={`text-center ${classLoad}`}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border border-success mb-3">
                        <div className="card-header bg-success border border-success text-white">
                            Titulo
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio