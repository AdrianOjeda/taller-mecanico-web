import React, { useState , useEffect} from "react";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import MobileTable from "./MobileTable";
function ListUsers() {

    const headers = [
        { label: 'ID', key: 'idUser' },
        { label: 'Username', key: 'username' },
        { label: 'Nombre', key: 'name' },
        { label: 'Apellidos', key: 'lastName' },
        { label: 'Teléfono', key: 'cellPhone' },
        { label: 'Dirección', key: 'address' },
        { label: 'Rol', key: 'role' },
        { label: 'Editar', key: 'editar' }, // Botón de Editar
        { label: 'Eliminar', key: 'eliminar' } // Botón de Eliminar
      ];

    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        contraseña: '',
        nombre: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        rol: ''
    });


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/users'); // API call to my Spring Boot backend
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
    
        fetchData();
    }, []);

    const openEditPopup = (id) => {
        console.log(id);
        setFormData(id);
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

        navigate('/users', {
            replace: true,
            state: { formData }
        });

        setFormData({
            username: '',
            contraseña: '',
            nombre: '',
            apellidos: '',
            telefono: '',
            direccion: '',
            rol: ''
        });
    };

    const handleDeleteSubmit = (userId) => {
        console.log(`Eliminando usuario con ID: ${userId}`);
    
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <>
            <div className="h-2"></div>
            <section className="flex bg-gray-200 dark:bg-slate-600 rounded-lg w-auto">
                <div className="container px-6 py-8 mx-auto">
                    <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Usuarios</h3> 
                    <div className="flex flex-col mt-8">
                        <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit}/>
                        <MobileTable  datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} type="usuario" />
                    </div>
                </div>
            </section>

            {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex justify-center items-center" id="my-modal">
                <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar Usuario</h3>
                        <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="username" 
                                    type="text" 
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="pasword">
                                    Contraseña
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="contraseña" 
                                    type="password" 
                                    name="contraseña"
                                    placeholder="Password"
                                    value={formData.contraseña}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="nombre" 
                                    type="text" 
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="apellidos">
                                    Apellidos
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="apellidos" 
                                    type="text" 
                                    name="apellidos"
                                    placeholder="Apellidos"
                                    value={formData.apellidos}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="telefono">
                                    Teléfono
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="telefono" 
                                    type="tel" 
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="direccion">
                                    Dirección
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="direccion" 
                                    type="text" 
                                    name="direccion"
                                    placeholder="Direccion"
                                    value={formData.direccion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="rol">
                                    Rol
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="rol" 
                                    value={formData.rol}
                                    name= "rol"
                                    onChange={handleInputChange}
                                    required
                                >   
                                    <option value=""></option>
                                    <option value="administrador">Administrador</option>
                                    <option value="secretaria">Secretaria</option>
                                    <option value="gerente">Gerente</option>
                                    <option value="mecanico">Mecánico</option>
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
    
        </>
    );
}

export default ListUsers;   