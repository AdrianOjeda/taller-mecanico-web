import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable"
import { useNavigate } from "react-router-dom";

function ListSpareParts() {
    const headers =  [
        { label: 'ID', key: 'id' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'Descripción', key: 'descripcion' },
        { label: 'Stock', key: 'stock' },
        { label: 'Editar', key: 'editar' }, // Botón de Editar
        { label: 'Eliminar', key: 'eliminar' } // Botón de Eliminar
    ];
    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombrePieza: '',
        descripcion: '',
        stock: '',
    });
 // Simulando la carga de datos de una API
    useEffect(() => {

        const fetch = async () => {
            const response = [
                { id: 1, nombre: 'Faros', descripcion: 'Roto', stock: 112,}
                
            ];
            setDatas(response);
        };

        fetch();
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

        navigate('/spareparts', {
            replace: true,
            state: { formData }
        });

        setFormData({
            nombre: '',
            descripcion: '',
            stock: '',
        });
    };

    const handleDeleteSubmit = (id) => {
        console.log(`Eliminando pieza: ${id}`);
    
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
                    <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Piezas</h3>
                    <div className="flex flex-col mt-8">
                        <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit} />
                        <MobileTable  datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} type="pieza"/>
                    </div>
                    
                </div>
            </section>
            {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex justify-center items-center" id="my-modal">
                <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar Pieza</h3>
                        <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre De La Pieza
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="nombre" 
                                    type="text" 
                                    name="nonbre"
                                    placeholder="Ingrese la nueva pieza"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="descripcion" 
                                    type="text" 
                                    name="descripcion"
                                    placeholder="Ingrese la nueva descripcion de la pieza"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="stock">
                                    Stock
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="stock" 
                                    type="number" 
                                    name="stock"
                                    placeholder="Ingrese si se encuentra en Stock o no"
                                    value={formData.stock}
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

export default ListSpareParts;
