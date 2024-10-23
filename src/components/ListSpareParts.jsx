import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable"
import { useNavigate, useLocation } from "react-router-dom";

function ListSpareParts() {
    const headers =  [
        { label: 'ID', key: 'idPieza' },
        { label: 'Nombre', key: 'piezaName' },
        { label: 'Descripción', key: 'piezaDescripcion' },
        { label: 'Stock', key: 'stock' },
        { label: 'Editar', key: 'editar' }, // Botón de Editar
        { label: 'Eliminar', key: 'eliminar' } // Botón de Eliminar
    ];

    const [editingPiezaId, setEditingPiezaId] = useState(null);
    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        piezaName: '',
        piezaDescripcion: '',
        stock: '',
    });
 // Simulando la carga de datos de una API
 const fetchData = async () => {
    try {
        const response = await fetch('/api/piezas'); // API call to my Spring Boot backend
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        setDatas(data);  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
 useEffect(() => {
    fetchData();
}, [location.state]);

    const openEditPopup = (id) => {
        setFormData(id)
        console.log(id.idPieza)
        console.log(id);
        
        setEditingPiezaId(id.idPieza);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(editingPiezaId);
        console.log(formData);
    
        // Call the API to edit the pieza
        const response = await fetch(`/api/piezas/${editingPiezaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    
        swal({ icon: "success", title: "Pieza editada con éxito" }).then(() => {
            fetchData(); // Refresh or refetch data after successful edit
        });

        closeEditPopup(); // Close the edit popup or modal

        
        setFormData({
            piezaName: '',
            piezaDescripcion: '',
            stock: '',
        });
    };
    

    const handleDeleteSubmit = async (row) => {
        console.log(row.idPieza);
        
       

        const idPieza = row.idPieza;
        console.log(`Eliminando pieza: ${idPieza}`);
        const response = await fetch(`/api/piezas/${idPieza}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            swal({ icon: 'success', title: 'Pieza eliminada con éxito' }).then(() => {
                fetchData(); // Function to refetch or refresh your data
            });
        } else {
            swal({ icon: 'error', title: 'No se pudo eliminar la pieza' });
        }
        
    
    
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
                                    id="piezaName" 
                                    type="text" 
                                    name="piezaName"
                                    placeholder="Ingrese la nueva pieza"
                                    value={formData.piezaName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="piezaDescripcion" 
                                    type="text" 
                                    name="piezaDescripcion"
                                    placeholder="Ingrese la nueva descripcion de la pieza"
                                    value={formData.piezaDescripcion}
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
