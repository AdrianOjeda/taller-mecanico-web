import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
function Charts() {
    // Estado para manejar los datos de las piezas de repuesto y marcas
    const [sparePartsData, setSparePartsData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [timeToRepair, setTimeToRepair] = useState([])

    useEffect(() => {
        // Simulación de llamada a una API (con datos aleatorios) máximo 8 elementos
        const fetchSparePartsData = async() => {
            
            try {
                const response = await fetch("/api/piezas/mostUsed",{
                    method:'GET',
                    credentials: 'include',
                });
                if(!response.ok){
                    throw new Error("No se pudo cargar el grafico");
                }else{
                    const data = await response.json();

                    console.log(data);
                    
                    setSparePartsData(data);
                }
            } catch (error) {
                console.error(error);
                
            }
            
        };

        const fetchBrandData = async() => {
            // Simulación de llamada a una API (con datos aleatorios) máximo 5 elementos
            try {
                const response = await fetch("/api/vehiculos/marcasRepaired");
                if(!response.ok){
                    throw new Error("No se pudo cargar el grafico");
                }else{
                    const data = await response.json();
                    setBrandData(data);
                }
            } catch (error) {
                console.error(error);
                
            }
            
        };

        const fetchTimeToRepair = async () => {
            //maximo 10
            try {
                const response  = await fetch("/api/reparaciones/fechas");
                if(!response.ok){
                    throw new Error("No se pudo cargar el grafico");
                    

                }else{
                    const data = await response.json();
                    console.log(data);
                    setTimeToRepair(data);
                }
            } catch (error) {
                console.error(error);
                
            }
            
        }

        fetchSparePartsData(); // Llama a la función para obtener los datos
        fetchBrandData();
        fetchTimeToRepair();
    }, []); // Solo se ejecuta una vez al cargar el componente

    return (
        <div className="dark:bg-azulBg bg-slate-300 min-h-screen w-full lg:flex">
            <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="p-4 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-auto">
                <div className="flex flex-col items-center  justify-center bg-slate-100 dark:bg-slate-300 rounded-2xl shadow-2xl dark:shadow-slate-800 p-4">
                    <h1 className=" md:text-5xl sm:text-4xl text-3xl text-center mb-10">Piezas más usadas</h1>
                    <PieChart 
                        data={sparePartsData} 
                        text="Piezas más usadas" 
                        labelKey="pieza_name" 
                        valueKey="veces_usada" 
                    />
                </div>
                <div className="flex flex-col items-center  justify-center bg-slate-100 dark:bg-slate-300 rounded-2xl shadow-2xl dark:shadow-slate-800 p-4">
                    <h1 className=" md:text-5xl sm:text-4xl text-3xl text-center mb-10">Marcas con más fallas y reparaciones</h1>
                    <PieChart 
                        data={brandData} 
                        text="Marcas con más fallas y reparaciones" 
                        labelKey="marca_vehiculo" 
                        valueKey="reparaciones_totales" 
                    />
                </div>
                <div className="flex flex-col items-center justify-center col-span-1 md:col-span-2 bg-slate-100 dark:bg-slate-300 rounded-2xl shadow-2xl dark:shadow-slate-800 p-4">
                    <h1 className=" md:text-5xl sm:text-4xl text-3xl text-center mb-10">Tiempo promedio en reparacion</h1>
                    <BarChart
                        data={timeToRepair} 
                        text="Tiempo promedios en reparaciones" 
                        labelKey="repair_duration" 
                        valueKey="total_reparaciones" 
                    />
                </div>
            </main>
        </div>
    );
}

export default Charts;
