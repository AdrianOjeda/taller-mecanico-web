import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";

function ListRepair() {
    const headers = [
        { label: 'ID', key: 'idReparacion' },
        { label: 'Cliente', key: 'firstName' },
        { label: 'Marca', key: 'marcaVehiculo' },
        { label: 'Modelo', key: 'modeloVehiculo' },
        { label: 'Matricula', key: 'matriculaVehiculo' },
        { label: 'Inicio', key: 'fechaInicio' },
        { label: 'Fin', key: 'fechaEntrega' },
        { label: 'Falla', key: 'falla' },
        { label: 'Editar', key: 'editar' },
        { label: 'Eliminar', key: 'eliminar' },
        { label: 'PDF', key: 'pdf'}
    ];
    const location = useLocation();
    const [editingRepairId, setEditingRepairId] = useState(null);
    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fechaEntrega: '',
        falla: '',
        
    });

    useEffect(() => {
        fetchData();
    }, [location.state]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/reparaciones', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error("Couldn't fetch reparaciones");
            }

            const data = await response.json();
            const transformedData = data.map(reparacion => ({
                idReparacion: reparacion.idReparacion,
                firstName: reparacion.vehiculo.cliente.firstName,
                marcaVehiculo: reparacion.vehiculo.marcaVehiculo,
                modeloVehiculo: reparacion.vehiculo.modeloVehiculo,
                matriculaVehiculo: reparacion.vehiculo.matriculaVehiculo,
                fechaInicio: reparacion.fechaInicio,
                fechaEntrega: reparacion.fechaEntrega,
                falla: reparacion.falla
            }));

            setDatas(transformedData);
        } catch (error) {
            console.error(error);
            swal({ icon: 'error', title: 'Error fetching data' });
        } finally {
            setLoading(false);
        }
    };

    const openEditPopup = (reparacion) => {
        setFormData({
            fechaEntrega: reparacion.fechaEntrega,
            falla: reparacion.falla,

        });
        setEditingRepairId(reparacion.idReparacion);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            fechaEntrega: '',
            falla: '',
            
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            const response = await fetch(`/api/reparaciones/${editingRepairId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                swal({ icon: 'success', title: 'Reparación editada con éxito' }).then(() => {
                    fetchData();
                });
                closeEditPopup();
            } else {
                throw new Error('No se pudo editar la reparación');
            }
        } catch (error) {
            console.error(error);
            swal({ icon: 'error', title: error.message });
        }
    };

    const handleDeleteSubmit = async (reparacion) => {
        console.log(`Eliminando reparación con ID: ${reparacion.idReparacion}`);

        const idReparacion = reparacion.idReparacion;
        try {
            const response = await fetch(`/api/reparaciones/${idReparacion}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                swal({ icon: 'success', title: 'Reparación eliminada con éxito' }).then(() => {
                    fetchData();
                });
            } else {
                throw new Error('No se pudo eliminar la reparación');
            }
        } catch (error) {
            console.error(error);
            swal({ icon: 'error', title: error.message });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="h-auto">
            {loading ? (
                <p>Cargando...</p> // Loading indicator
            ) : (
                <section className="flex bg-gray-200 dark:bg-slate-600 rounded-lg w-auto">
                    <div className="container px-6 py-8 mx-auto">
                        <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Reparaciones</h3>
                        <div className="flex flex-col mt-8">
                            <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit} isRepair={true}/>
                            <MobileTable datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} isRepair={true} />
                        </div>
                    </div>
                </section>
            )}
            {isEditPopupOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex justify-center items-center" id="my-modal">
                    <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar Reparación</h3>
                            <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="falla">
                                        Falla
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="falla"
                                        type="text"
                                        name="falla"
                                        placeholder="Falla"
                                        value={formData.falla}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="fin">
                                        Fin
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="fin"
                                        type="date"
                                        name="fechaEntrega"
                                        value={formData.fechaEntrega}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        id="saveChange"
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={closeEditPopup}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListRepair;
