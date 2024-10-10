import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable"
import { useNavigate } from "react-router-dom";

function ListRepair() {
    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Cliente', key: 'cliente' },
        { label: 'Marca', key: 'marca' },
        { label: 'Modelo', key: 'modelo' },
        { label: 'Matricula', key: 'matricula' },
        { label: 'Inicio', key: 'inicio' },
        { label: 'Fin', key: 'fin' },
        { label: 'Falla', key: 'falla' },
        { label: 'Status', key: 'status' },
        { label: 'Editar', key: 'editar' }, 
        { label: 'Eliminar', key: 'eliminar' } 
    ];
    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fin: '',
        falla: '',
        status:''
    });
 // Simulando la carga de datos de una API
    useEffect(() => {

        const fetchData = async () => {
            const response = [
                { id: 1,cliente:'Jhovany', marca: 'Nissan', modelo: 'Versa', matricula: 'MJDH93', inicio: '03/10/2024', fin: '13/10/2024', falla: 'el carro no tiene frenos y arreglo de farolas' ,status:'En proceso'},
                
            ];
            setDatas(response  );
        };

        fetchData();
    }, []);

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

        navigate('/repairs', {
            replace: true,
            state: { formData }
        });

        setFormData({
            fin: '',
            falla: '',
            status:''   
        });
    };

    const handleDeleteSubmit = (userId) => {
        console.log(`Eliminando reparacion con ID: ${userId}`);
    
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
                    <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Reparaciones</h3>
                    <div className="flex flex-col mt-8">
                        <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit} />
                        <MobileTable  datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} />
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
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="falla">
                                    Falla
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="color" 
                                    type="text" 
                                    name="color"
                                    placeholder="Color"
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
                                    name="fin"
                                    value={formData.fin}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="status" 
                                    value={formData.status}
                                    name= "status"
                                    onChange={handleInputChange}
                                    required
                                >   
                                    <option value=""></option>
                                    <option value="En proceso">En proceso</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
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

export default ListRepair;
