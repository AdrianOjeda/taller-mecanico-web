import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable"
import { useNavigate } from "react-router-dom";

function ListVehicles() {
    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Cliente', key: 'cliente' },
        { label: 'Marca', key: 'marca' },
        { label: 'Modelo', key: 'modelo' },
        { label: 'Matricula', key: 'matricula' },
        { label: 'Fecha', key: 'fecha' },
        { label: 'Notas', key: 'notas' },
        { label: 'Color', key: 'color'},
        { label: 'Editar', key: 'editar' }, // Botón de Editar
        { label: 'Eliminar', key: 'eliminar' } // Botón de Eliminar
        ];
    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cliente: '',
        marca: '',
        modelo: '',
        matricula: '',
        fecha: '',
        color: '',
        notas:''
    });
 // Simulando la carga de datos de una API
    useEffect(() => {

        

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/vehiculos");
            if (response.ok) {
                const data = await response.json();
                // Map the response to include the client info in the desired format
                const mappedData = data.map(vehiculo => ({
                    id: vehiculo.idVehiculo,
                    cliente: vehiculo.cliente ? `${vehiculo.cliente.firstName} ${vehiculo.cliente.lastName}` : 'N/A',
                    marca: vehiculo.marcaVehiculo,
                    modelo: vehiculo.modeloVehiculo,
                    matricula: vehiculo.matriculaVehiculo,
                    fecha: vehiculo.fechaIngreso,
                    notas: vehiculo.notasVehiculo,
                    color: vehiculo.colorVehiculo
                }));
                setDatas(mappedData);
                
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const openEditPopup = (id) => {
        setFormData(id)
        console.log(id)
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //aqui debe ir la api que edita
        
        closeEditPopup();

        navigate('/vehicles', {
            replace: true,
            state: { formData }
        });

        setFormData({
            cliente: '',
            marca: '',
            modelo: '',
            matricula: '',
            fecha: '',
            color: '',
            notas:''
        });
    };

    const handleDeleteSubmit = (userId) => {
        console.log(`Eliminando vehiculo con ID: ${userId}`);
    
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className="h-auto">
            <section className="flex bg-gray-200 dark:bg-slate-600 rounded-lg w-auto">
                <div className="container px-6 py-8 mx-auto">
                    <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Vehículos</h3>
                    <div className="flex flex-col mt-8">
                        <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit} isColor={true}/>
                        <MobileTable  datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} type="vehiculo"/>
                    </div>
                    
                </div>
            </section>
            {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex justify-center items-center" id="my-modal">
                <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar vehiculo</h3>
                        <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="brand">
                                    Marca
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="marca" 
                                    type="text" 
                                    name="marca"
                                    placeholder="Marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="model">
                                    Modelo
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="modelo" 
                                    type="text" 
                                    name="modelo"
                                    placeholder="Modelo"
                                    value={formData.modelo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="matriculate">
                                    Matriculas
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="matricula" 
                                    type="text" 
                                    name="matricula"
                                    placeholder="Matricula"
                                    value={formData.matricula}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4 ">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="color">
                                    Color
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full h-11 py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="color" 
                                    type="color" 
                                    name="color"
                                    placeholder="Color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="notas">
                                    Nota
                                </label>
                                <InputForm 
                                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="notas" 
                                    type="text" 
                                    name="notas"
                                    placeholder="Notas"
                                    value={formData.notas}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                                id="saveChange"
                                name="rol"
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

export default ListVehicles;