import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

export default function VehicleRepairForm() {
    const navigate = useNavigate();
    const [searchMatricula, setSearchMatricula] = useState('');
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        matricula: '',
        Inicio: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0], 
        fin: '',
        falla: '',
        piezasUtilizadas: [{ pieza: '', cantidad: 1 }],
    });
    const [piezas, setPiezas] = useState([]);
    const [error, setError] = useState('');  
    useEffect(() => {
        const fetchPiezas = async () => {
            // Simulando una llamada a API para obtener piezas y su stock
            const response = [
                { id: 1, nombre: "Motor", stock: 10 },
                { id: 2, nombre: "Transmisión", stock: 5 },
                { id: 3, nombre: "Frenos", stock: 8 },
                { id: 4, nombre: "Suspensión", stock: 12 }
            ];
            setPiezas(response);
        };

        fetchPiezas();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Validar si la matrícula fue ingresada antes de realizar la búsqueda
        if (!searchMatricula) {
            setError("Debe ingresar una matrícula para buscar el vehículo.");
            return;
        }

        // Simulación de búsqueda exitosa
        setFormData({
            ...formData,
            marca: 'Marca Encontrada',
            modelo: 'Modelo Encontrado',
            matricula: searchMatricula,
        });
        setError(''); // Limpiar errores al buscar con éxito
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePiezaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPiezasUtilizadas = [...formData.piezasUtilizadas];
        updatedPiezasUtilizadas[index] = { ...updatedPiezasUtilizadas[index], [name]: value };
        setFormData({ ...formData, piezasUtilizadas: updatedPiezasUtilizadas });
    };

    const agregarPieza = () => {
        // Validar que primero se haya buscado el vehículo antes de agregar piezas
        if (!formData.matricula) {
            setError("Debe buscar un vehículo antes de agregar piezas.");
            return;
        }

        setFormData({
            ...formData,
            piezasUtilizadas: [...formData.piezasUtilizadas, { pieza: '', cantidad: 1 }],
        });
        setError(''); // Limpiar errores al agregar piezas correctamente
    };

    const quitarPieza = (index) => {
        const updatedPiezasUtilizadas = formData.piezasUtilizadas.filter((_, i) => i !== index);
        setFormData({ ...formData, piezasUtilizadas: updatedPiezasUtilizadas });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que se haya buscado el vehículo antes de enviar
        if (!formData.marca || !formData.modelo || !formData.matricula) {
            setError("Debe buscar un vehículo antes de guardar la reparación.");
            return;
        }

        console.log(formData);
        navigate('/repairs', {
            replace: true,
            state: { formData }
        });
        setFormData(
            {
                marca: '',
                modelo: '',
                matricula: '',
                Inicio: new Date().toISOString().split('T')[0],
                fin: '',
                falla: '',
                piezasUtilizadas: [{ pieza: '', cantidad: 1 }],
            }
        )


        setError(''); 
        // Aquí iría la lógica para enviar los datos
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
                                    name="marca"
                                    value={formData.marca}
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
                                    name="modelo"
                                    value={formData.modelo}
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
                                    name="matricula"
                                    value={formData.matricula}
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
                                    name="Inicio"
                                    value={formData.Inicio}
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
                                    name="fin"
                                    value={formData.fin}
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
                                                name="pieza"
                                                value={piezaUtilizada.pieza}
                                                onChange={(e) => handlePiezaChange(index, e)}
                                            >
                                                <option value="">Seleccione una pieza</option>
                                                {piezas.map((pieza) => (
                                                    <option key={pieza.id} value={pieza.id.toString()}>
                                                        {pieza.nombre} (Stock: {pieza.stock})
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
                                                id={`cantidad-${index}`}
                                                type="number"
                                                name="cantidad"
                                                min="1"
                                                max={piezas.find(p => p.id.toString() === piezaUtilizada.pieza)?.stock || 1}
                                                value={piezaUtilizada.cantidad}
                                                onChange={(e) => handlePiezaChange(index, e)}
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
