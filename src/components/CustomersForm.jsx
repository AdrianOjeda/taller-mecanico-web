import React, { useState, useEffect } from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function CustomersForm() {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        try {
            
            const response = await fetch("/api/clientes",{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if(response.ok){

                swal({icon:'success', title:'Cliente agregado con exito'});
                navigate('/customers', {
                    replace: true,
                    state: { formData }
                });
        
                setFormData({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                });
            }else{
                
            }
        } catch (error) {
            console.error(error);
            
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
                    <label htmlFor="firstName" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Nombre</label>
                    <InputForm
                        id="firstName"
                        type="text"
                        placeholder="Ingresa el nombre"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Apellidos</label>
                    <InputForm
                        id="lastName"
                        type="text"
                        placeholder="Ingresa los apellidos"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Teléfono</label>
                    <InputForm
                        id="phoneNumber"
                        type="tel"
                        placeholder="Ingresa el telefono del cliente"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Dirección</label>
                    <InputForm
                        id="address"
                        type="text"
                        placeholder="Ingresa la direccion del cliente"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
              
            </div>
            <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:border-b-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit
            </button>
        </form>
    );
}

export default CustomersForm;
