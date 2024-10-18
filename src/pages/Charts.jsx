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
        const fetchSparePartsData = () => {
            const data = [
                { pieza: "Batería", cantidad: 1 },
                { pieza: "Frenos", cantidad: 20 },
                { pieza: "Filtro de Aceite", cantidad: 23 },
                { pieza: "Amortiguadores", cantidad: 2 },
                { pieza: "Neumáticos", cantidad: 8 },
                { pieza: "Radiador", cantidad: 155 },
                { pieza: "Luces", cantidad: 456 },
                { pieza: "Bujías", cantidad: 15 },
            ];
            setSparePartsData(data);
        };

        const fetchBrandData = () => {
            // Simulación de llamada a una API (con datos aleatorios) máximo 5 elementos
            const data = [
                { marca: "Nissan", cantidad: 23 },
                { marca: "Toyota", cantidad: 13 },
                { marca: "Audi", cantidad: 6 },
                { marca: "Mercedes", cantidad: 3 },
                { marca: "Ford", cantidad: 33}
            ];
            setBrandData(data);
        };

        const fetchTimeToRepair = () => {
            //maximo 10
            const data = [
                {dias : 7, cantidad: 23},
                {dias : 14, cantidad: 3},
                {dias : 3, cantidad: 11},
                {dias : 23, cantidad: 20},
                {dias : 31, cantidad: 50},
            ];
            setTimeToRepair(data);
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
                        labelKey="pieza" 
                        valueKey="cantidad" 
                    />
                </div>
                <div className="flex flex-col items-center  justify-center bg-slate-100 dark:bg-slate-300 rounded-2xl shadow-2xl dark:shadow-slate-800 p-4">
                    <h1 className=" md:text-5xl sm:text-4xl text-3xl text-center mb-10">Marcas con más fallas y reparaciones</h1>
                    <PieChart 
                        data={brandData} 
                        text="Marcas con más fallas y reparaciones" 
                        labelKey="marca" 
                        valueKey="cantidad" 
                    />
                </div>
                <div className="flex flex-col items-center justify-center col-span-1 md:col-span-2 bg-slate-100 dark:bg-slate-300 rounded-2xl shadow-2xl dark:shadow-slate-800 p-4">
                    <h1 className=" md:text-5xl sm:text-4xl text-3xl text-center mb-10">Tiempo promedio en reparacion</h1>
                    <BarChart
                        data={timeToRepair} 
                        text="Tiempo promedios en reparaciones" 
                        labelKey="dias" 
                        valueKey="cantidad" 
                    />
                </div>
            </main>
        </div>
    );
}

export default Charts;
