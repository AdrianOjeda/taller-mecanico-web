import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

import swal from 'sweetalert'; 

export default function VehicleRepairForm() {
    const navigate = useNavigate();
    const [searchMatricula, setSearchMatricula] = useState('');
    const [formData, setFormData] = useState({
        marcaVehiculo: '',
        modeloVehiculo: '',
        matriculaVehiculo: '',
        vehiculo: { idVehiculo: null }, 
        fechaInicio: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0],
        fechaEntrega: '',
        falla: '',
        piezasUtilizadas: [{ idPieza: null, stock: 1 }],
    });
    const [piezas, setPiezas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPiezas = async () => {
            try {
                const response = await fetch("/api/piezas", {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setPiezas(data);
                } else {
                    console.error("Error fetching piezas data");
                }
            } catch (error) {
                console.error("Couldn't fetch piezas");
            }
        };
        fetchPiezas();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/vehiculos/searchByMatricula/${searchMatricula}`, {
                method: 'GET',
            });
            if (!response.ok) {
                swal({ icon: 'error', title: 'No existe un vehículo con esa matrícula' });
            } else {
                const data = await response.json();
                setFormData({
                    ...formData,
                    marcaVehiculo: data.marcaVehiculo,
                    modeloVehiculo: data.modeloVehiculo,
                    matriculaVehiculo: searchMatricula,
                    vehiculo: { idVehiculo: parseInt(data.idVehiculo, 10) }, 
                });
                setError('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fechaEntrega' && value < formData.fechaInicio) {
            setError('La fecha de entrega no puede ser anterior a la fecha de inicio.');
        } else {
            setFormData({ ...formData, [name]: value });
            setError('');
        }
    };

    const handlePiezaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPiezasUtilizadas = [...formData.piezasUtilizadas];

        if (name === 'idPieza') {
            updatedPiezasUtilizadas[index].idPieza = parseInt(value, 10) || null;
        } else if (name === 'stock') {
            const selectedPieza = piezas.find(p => p.idPieza === updatedPiezasUtilizadas[index].idPieza);
            if (selectedPieza && parseInt(value, 10) > selectedPieza.stock) {
                setError('La cantidad no puede ser mayor que el stock disponible.');
                return;
            }
            updatedPiezasUtilizadas[index].stock = parseInt(value, 10) || 1;
        }

        setFormData({ ...formData, piezasUtilizadas: updatedPiezasUtilizadas });
        setError('');
    };

    const agregarPieza = () => {
        if (!formData.matriculaVehiculo) {
            setError("Debe buscar un vehículo antes de agregar piezas.");
            return;
        }
        setFormData({
            ...formData,
            piezasUtilizadas: [...formData.piezasUtilizadas, { idPieza: null, stock: 1 }],
        });
        setError('');
    };

    const quitarPieza = (index) => {
        const updatedPiezasUtilizadas = formData.piezasUtilizadas.filter((_, i) => i !== index);
        setFormData({ ...formData, piezasUtilizadas: updatedPiezasUtilizadas });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.marcaVehiculo || !formData.modeloVehiculo || !formData.matriculaVehiculo || formData.vehiculo.idVehiculo === null) {
            setError("Debe buscar un vehículo antes de guardar la reparación.");
            return;
        }

        try {
            const response = await fetch("/api/reparaciones", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                swal({ icon: 'error', title: 'No se pudo agregar la reparacion' });
            } else {
                swal({ icon: 'success', title: 'Reparacion agregada con exito' }).then(() => {
                    navigate('/repairs', {
                        replace: true,
                        state: { formData, timestamp: new Date().getTime() } 
                    });
                });
                
                const currentDate = new Date().toISOString().split('T')[0];
                setFormData({
                    marcaVehiculo: '',
                    modeloVehiculo: '',
                    matriculaVehiculo: '',
                    vehiculo: { idVehiculo: null }, 
                    fechaInicio: currentDate,
                    fechaEntrega: '',
                    falla: '',
                    piezasUtilizadas: [{ idPieza: null, stock: 1 }],
                });
                setError('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="w-full mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <div className="container px-6 py-8 mx-auto">
                <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Reparación de Vehículo</h3>
                
                {/* Mostrar mensajes de error */}
                {error && <p className="text-red-500 font-medium">{error}</p>}
                
                <div className="space-y-4 mt-8">
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-4">
                            <InputForm
                                className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white"
                                type="text"
                                placeholder="Buscar por matrícula"
                                value={searchMatricula}
                                onChange={(e) => setSearchMatricula(e.target.value)}
                            />
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                            >
                                Buscar
                            </button>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="marca">
                                    Marca
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="marca" 
                                    type="text" 
                                    name="marcaVehiculo"
                                    value={formData.marcaVehiculo}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="modelo">
                                    Modelo
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="modelo" 
                                    type="text" 
                                    name="modeloVehiculo"
                                    value={formData.modeloVehiculo}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="matricula">
                                    Matrícula
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="matricula" 
                                    type="text" 
                                    name="matriculaVehiculo"
                                    value={formData.matriculaVehiculo}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="Inicio">
                                    Inicio
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="Inicio" 
                                    type="date" 
                                    name="fechaInicio"
                                    value={formData.fechaInicio}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="fin">
                                    Fin
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="fin" 
                                    type="date" 
                                    name="fechaEntrega"
                                    value={formData.fechaEntrega}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor="falla">
                                    Falla
                                </label>
                                <InputForm 
                                    className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white" 
                                    id="falla" 
                                    type="text" 
                                    name="falla"
                                    value={formData.falla}
                                    onChange={handleInputChange}
                                    placeholder="Descripción de la falla"
                                />
                            </div>

                            {/* Sección de las piezas */}
                            {formData.piezasUtilizadas.map((piezaUtilizada, index) => (
                                <div key={index} className="md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor={`pieza-${index}`}>
                                                Pieza
                                            </label>
                                            <select
                                                className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white"
                                                id={`pieza-${index}`}
                                                name="idPieza" // Changed from 'pieza' to 'idPieza'
                                                value={piezaUtilizada.idPieza || ""} // Ensure you're using idPieza
                                                onChange={(e) => handlePiezaChange(index, e)}
                                            >
                                                <option value="">Seleccione una pieza</option>
                                                {piezas.map((pieza) => (
                                                    <option key={pieza.idPieza} value={pieza.idPieza.toString()}>
                                                        {pieza.piezaName} (Stock: {pieza.stock})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-800 dark:text-slate-200" htmlFor={`cantidad-${index}`}>
                                                Cantidad
                                            </label>
                                            <InputForm
                                                className="h-10 mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 dark:text-white"
                                                type="number"
                                                name="stock" // Make sure to keep this as 'stock'
                                                value={piezaUtilizada.stock || 1} // Ensure default value to prevent NaN
                                                onChange={(e) => handlePiezaChange(index, e)}
                                                min="1"
                                                max={piezas.find(p => p.idPieza === piezaUtilizada.idPieza)?.stock || 1}
                                                placeholder="Cantidad"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => quitarPieza(index)}
                                                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="md:col-span-2">
                                <button
                                    type="button"
                                    onClick={agregarPieza}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Agregar otra pieza
                                </button>
                            </div>
                        </div>

                        <button 
                            className="mt-6 w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:border-b-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                            type="submit"
                        >
                            Guardar Reparación
                        </button>
                    </form>
                </div>
            </div>
        </section> 
    );
}
