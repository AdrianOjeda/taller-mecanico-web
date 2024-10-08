import React, { useState , useEffect} from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function CustomersForm() {
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
    })

    const navigate = useNavigate();

    const handleSubmit=(e) => {
        e.preventDefault();
        console.log(formData)

        navigate('/customers', {
            replace: true,
            state: { formData }
        });

        setFormData({
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
        });
    }
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
            [name]: value,
        });
    };

    return(
        <form
            className="w-full mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
            onSubmit={handleSubmit} 
        >
            <div className="space-y-4">
                
                <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Nombre</label>
                    <InputForm
                        id="nombre"
                        type="text"
                        placeholder="Ingrese el nombre del cliente"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Apellido Paterno</label>
                    <InputForm
                        id="apellidoPaterno"
                        type="text"
                        placeholder="Ingrese el Apellido Paterno del cliente"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Apellido Materno</label>
                    <InputForm
                        id="apellidoMaterno"
                        type="text"
                        placeholder="Ingrese el Apellido Materno del cliente"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
              
            </div>
            <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:border-b-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Enviar
            </button>
        </form>
    )
}

export default CustomersForm;