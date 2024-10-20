import React from "react";
import SideBar from "../components/SideBar";
import ListVehicles from "../components/ListVehicles";
import VehicleForm from "../components/VehicleForm";
function Vehicles() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 min-h-screen w-full lg:flex">
            <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="flex-grow p-1 relative z-10">
                <div>
                    <div className="text-5xl dark:text-white font-medium text-center">
                        <h1>Agregar vehiculo</h1>
                    </div>
                    <VehicleForm/>
                </div>
                <div>
                    <ListVehicles />
                </div>
            </main>
        </div>
    );
}

export default Vehicles;