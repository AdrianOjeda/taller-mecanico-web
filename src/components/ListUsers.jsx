import React, { useState } from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";

function ListUsers() {
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        password: '',
        name: '',
        lastName: '',
        phone: '',
        address: '',
        rol: ''
    });

    const openEditPopup = () => {
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        closeEditPopup();

        navigate('/users', {
            replace: true,
            state: { formData }
        });

        setFormData({
            user: '',
            password: '',
            name: '',
            lastName: '',
            phone: '',
            address: '',
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
                        {/* Tabla grande */}
                        <div className="hidden xl:block bg-white dark:bg-gray-800 overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Apellidos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teléfono</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dirección</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Editar</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">1</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">ElJhova</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Christian</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Flores Lozano</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">33308943</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Brillante</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Administrador</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <button onClick={() => openEditPopup()}><EditIcon/></button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <DeleteIcon onClick={() => handleDeleteSubmit(1)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Tabla pequeña (Mobile) */}
                        <div className="xl:hidden space-y-6">
                            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Usuario</h3>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700">
                                    <dl>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">ID</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">1</dd>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Username</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">ElJhova</dd>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Nombre</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">Christian</dd>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Apellidos</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">Flores Lozano</dd>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Teléfono</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">30303923</dd>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Dirección</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">Brillante</dd>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Rol</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">Administrador</dd>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Editar</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                                <button onClick={() => openEditPopup()}><EditIcon /></button>
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Eliminar</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                                <DeleteIcon onClick={() => handleDeleteSubmit(1)} />
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popup de edición */}
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
                                    id="user" 
                                    type="text" 
                                    name="user"
                                    placeholder="Username"
                                    value={formData.user}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="nombre">
                                    Password
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="name" 
                                    type="text" 
                                    name="name"
                                    placeholder="Nombre"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="apellidos">
                                    Apellidos
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="lastName" 
                                    type="text" 
                                    name="lastName"
                                    placeholder="Apellidos"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="telefono">
                                    Teléfono
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="phone" 
                                    type="text" 
                                    name="phone"
                                    placeholder="Teléfono"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="direccion">
                                    Dirección
                                </label>
                                <InputForm 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline" 
                                    id="address" 
                                    type="text" 
                                    name="address"
                                    placeholder="address"
                                    value={formData.address}
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
                                >
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