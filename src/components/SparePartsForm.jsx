import React, { useState , useEffect} from "react";
import InputForm from './InputForm';
import { useNavigate } from "react-router-dom";

function SparePartsForm() {
    
    const [formData, setFormData] = useState({
        piezaName: '',
        piezaDescripcion: '',
        stock: 0,
    })

    const navigate = useNavigate();

    const handleSubmit=async (e) => {
        e.preventDefault();
        console.log(formData)
        try {

            const response = await fetch('/api/piezas',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if(response.ok){
                swal({icon:'success', title:'Pieza agregada con exito'}).then(()=>{
                    navigate('/spareparts', { replace: true, state: { formData } });
                })
                navigate('/spareparts', {
                    replace: true,
                    state: { formData }
                });
        
                setFormData({
                    piezaName: '',
                    piezaDescripcion: '',
                    stock: '',
                });
    
            }else throw new Error('Error agregando nuevas partes');
            
        } catch (error) {
            swal({icon:'error', title:'No se pudo agregar una nueva pieza'})
        }


        
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
                    <label htmlFor="namespareparts" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Nombre de la pieza</label>
                    <InputForm
                        id="piezaName"
                        type="text"
                        placeholder="Ingrese el nombre de la pieza"
                        name="piezaName"
                        value={formData.piezaName}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="descripcion" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Descripción</label>
                    <InputForm
                        id="piezaDescripcion"
                        type="text"
                        placeholder="Ingrese la descripcion de la pieza"
                        name="piezaDescripcion"
                        value={formData.piezaDescripcion}
                        onChange={handleInputChange} 
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-700 h-10 p-1 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-lg font-medium text-gray-800 dark:text-slate-200">Stock</label>
                    <InputForm
                        id="stock"
                        type="number"
                        placeholder="Ingrese si la pieza se encuentra en stock"
                        name="stock"
                        value={formData.stock}
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

export default SparePartsForm;