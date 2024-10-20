import React, { useState, useEffect } from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function VehicleForm() {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        idCliente: 0,
        marcaVehiculo: '',
        modeloVehiculo: '',
        matriculaVehiculo: '',
        fechaIngreso: '',
        colorVehiculo: '',
        notasVehiculo: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/clientes");
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            } else {
                throw new Error("Couldn't fetch client data");
            }
        };

        fetchData();

        // Set the current date
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        setFormData((prevFormData) => ({
            ...prevFormData,
            fechaIngreso: currentDate // Use fechaIngreso instead of fecha
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'idCliente' ? parseInt(value) : value, // Adjusted for idCliente
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const adjustedFormData = {
            ...formData,
            cliente: {
                idCliente: formData.idCliente
            }
        };
        console.log(adjustedFormData);
        
        try {
            const response = await fetch("/api/vehiculos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adjustedFormData),
            });

            if (response.ok) {
                swal({icon:'success', title:'Vehiculo agregado con exito'}).then(()=>{
                    navigate("/vehicles"); // Adjust the navigation path as needed
                })

                setFormData({
                    idCliente: 0,
                    marcaVehiculo: '',
                    modeloVehiculo: '',
                    matriculaVehiculo: '',
                    fechaIngreso: '',
                    colorVehiculo: '',
                    notasVehiculo: ''                        
                });
                
            } else {
                swal({icon:'error', title:'No se pudo agregar el vehiculo'})
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className="w-full mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
            onSubmit={handleSubmit}
        >
            <div className="space-y-4">
                <div>
                    <label htmlFor="cliente" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Cliente</label>
                    <select
                        id="cliente"
                        className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring dark:bg-slate-700 dark:text-white"
                        value={formData.idCliente}
                        name="idCliente" // Use idCliente instead of cliente
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecciona un cliente</option>
                        {customers.map((customer) => (
                            <option value={customer.idCliente} key={customer.idCliente}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="marca" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Marca</label>
                    <InputForm
                        id="marca"
                        type="text"
                        placeholder="Ingrese la marca"
                        name="marcaVehiculo"
                        value={formData.marcaVehiculo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="modelo" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Modelo</label>
                    <InputForm
                        id="modelo"
                        type="text"
                        placeholder="Ingrese el modelo"
                        name="modeloVehiculo"
                        value={formData.modeloVehiculo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="matricula" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Matricula</label>
                    <InputForm
                        id="matricula"
                        type="text"
                        placeholder="Ingrese la matricula"
                        name="matriculaVehiculo"
                        value={formData.matriculaVehiculo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="fechaIngreso" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Fecha de registro</label>
                    <InputForm
                        id="fechaIngreso"
                        type="text"
                        name="fechaIngreso"
                        value={formData.fechaIngreso}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm cursor-not-allowed dark:bg-slate-700 h-10 p-1 dark:text-white"
                        disabled={true}
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Color</label>
                    <InputForm
                        id="color"
                        type="color"
                        placeholder="Ingrese descripcion del color"
                        name="colorVehiculo"
                        value={formData.colorVehiculo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="notas" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Notas</label>
                    <InputForm
                        id="notas"
                        type="text"
                        placeholder="Ingrese nota sobre el vehiculo"
                        name="notasVehiculo"
                        value={formData.notasVehiculo}
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
    );
}

export default VehicleForm;
