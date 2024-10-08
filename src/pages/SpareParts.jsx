import React from "react";
import SideBar from "../components/SideBar";
import SparePartsForm from "../components/SparePartsForm";
import ListSpareParts from "../components/ListSpareParts";


function SpareParts() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 h-auto w-screen lg:flex">
             <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="flex-grow p-1 relative z-10">  
                <div>
                <div className="text-5xl dark:text-white font-medium text-center">
                        <h1>Crear Pieza</h1>
                    </div>
                    <SparePartsForm/>
                    <div>
                    <ListSpareParts/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SpareParts;