import React, { useState } from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function UserForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword:"",
        name: '',
        lastName: '',
        cellPhone: '',
        address: '',
        role: ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
    
        if (formData.password !== formData.confirmPassword) {
            swal({icon:"error", title:"Las contraseñas deben coincidir"});
            return;
        }
    
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Sending the form info to the backend
            });
    
            if (response.ok) {
                swal({ icon: "success", title: "Usuario creado con éxito" });
                navigate('/users', {
                    replace: true,
                    state: { formData }
                });
    
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: "",
                    name: '',
                    lastName: '',
                    cellPhone: '',
                    address: '',
                    role: ''
                });
            } else if (response.status === 409) {  
                const errorData = await response.text();  
                swal({icon: "error", title: errorData});  
            } else {
                throw new Error("Error en la creación del usuario");
            }
    
        } catch(error) {
            swal({icon:"error", title: error.message});
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Ingrese su futura contraseña"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Confirmar contraseña</label>
                    <InputForm
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
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
                        name="name"
                        value={formData.name}
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
                        name="lastName"
                        value={formData.lastName}
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
                        name="cellPhone"
                        value={formData.cellPhone}
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
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="rol" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Rol</label>
                    <select
                        id="rol"
                        className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring dark:bg-slate-700 dark:text-white"
                        value={formData.role}
                        name="role"
                        onChange={handleInputChange}
                        required    
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                        
                        <option value="GERENTE">Gerente</option>
                        <option value="MECANICO">Mecánico</option>
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
