import React, { useState , useEffect} from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function VeihcleForm() {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        cliente: '',
        marca: '',
        modelo: '',
        matricula: '',
        fecha: '',
        color: '',
        notas:''
    })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // Simulando una llamada a API
            const response = [
                {id:1, nombre: "Christian" },
                {id:4, nombre: "Pedro" }
            ];
            setCustomers(response);
        };

        fetchData();

        // Establecer fecha actual al montar el componente
        const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        setFormData((prevFormData) => ({
            ...prevFormData,
            fecha: currentDate
        }));
    }, []);

    const handleSubmit=(e) => {
        e.preventDefault();
        console.log(formData)

        navigate('/vehicles', {
            replace: true,
            state: { formData }
        });

        setFormData({
            cliente: '',
            marca: '',
            modelo: '',
            matricula: '',
            fecha: new Date().toISOString().split('T')[0],
            color: '',
            notas: ''
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
                <label htmlFor="customer" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Cliente</label>
                <select
                        id="cliente"
                        className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring dark:bg-slate-700 dark:text-white"
                        value={formData.cliente}
                        name="cliente"
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" >  Selecciona un cliente</option>
                        {customers.map((customer,index)=>(
                            <option value= {customer.id} key={index}>{customer.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="brand" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Marca</label>
                    <InputForm
                        id="marca"
                        type="text"
                        placeholder="Ingrese la marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="model" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Modelo</label>
                    <InputForm
                        id="modelo"
                        type="text"
                        placeholder="Ingrese el modelo"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="matriculate" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Matriculas</label>
                    <InputForm
                        id="matricula"
                        type="text"
                        placeholder="Ingrese la matricula"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="fecha" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Fecha de registro</label>
                    <InputForm
                        id="fecha"
                        type="text"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm cursor-not-allowed dark:bg-slate-700 h-10 p-1 dark:text-white"
                        disabled={true}
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block text-lg font-medium text-gray-800 dark:text-slate-200">color</label>
                    <InputForm
                        id="color"
                        type="text"
                        placeholder="Ingrese descripcion del color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="note" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Notas</label>
                    <InputForm
                        id="notas"
                        type="text"
                        placeholder="Ingrese nota sobre el vehiculo"
                        name="notas"
                        value={formData.notas}
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

export default VeihcleForm;