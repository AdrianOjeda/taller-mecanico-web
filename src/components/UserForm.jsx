import React, { useState } from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function UserForm() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form
            className="w-full mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
            onSubmit={handleSubmit} 
        >
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Username</label>
                    <InputForm
                        id="username"
                        type="text"
                        placeholder="Ingresar nombre de usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange} // Actualización del estado
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Contraseña</label>
                    <InputForm
                        id="contraseña"
                        type="password"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleInputChange}
                        placeholder="Ingrese su futura contraseña"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Nombre</label>
                    <InputForm
                        id="nombre"
                        type="text"
                        placeholder="Ingrese su nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Apellidos</label>
                    <InputForm
                        id="apellidos"
                        type="text"
                        placeholder="Ingrese sus apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Teléfono</label>
                    <InputForm
                        id="telefono"
                        type="tel"
                        placeholder="Ingrese su telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Dirección</label>
                    <InputForm
                        id="direccion"
                        type="text"
                        placeholder="Ingrese la direccion donde vive (calle con numero, colonia)"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="rol" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Rol</label>
                    <select
                        id="rol"
                        className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring dark:bg-slate-700 dark:text-white"
                        value={formData.rol}
                        name="rol"
                        onChange={handleInputChange}
                        required    
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="administrador">Administrador</option>
                        
                        <option value="gerente">Gerente</option>
                        <option value="mecanico">Mecánico</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:border-b-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Enviar
            </button>
        </form>
    );
}

export default UserForm;
