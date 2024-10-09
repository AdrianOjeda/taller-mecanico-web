import React from "react";
import SideBar from "../components/SideBar";
import RepairForm from "../components/RepairForm"
import ListRepair from "../components/ListRepair";
function Repairs() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 min-h-screen w-full lg:flex">
            <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="flex-grow p-1 relative z-10">
                <div>
                    <div className="text-5xl dark:text-white font-medium text-center">
                        <h1>Ingresar detalles de nueva reparacion</h1>
                    </div>
                    <RepairForm/>
                </div>
                <div>
                    <ListRepair/>
                </div>
            </main>
        </div>
    );
}

export default Repairs;