import React from "react";
import SideBar from "../components/SideBar";
import CustomersForm from "../components/CustomersForm";
import ListCustomers from "../components/ListCustomers"; 

function Customers() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 min-h-screen w-full lg:flex">
             <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="flex-grow p-1 relative z-10">  
                <div>
                <div className="text-5xl dark:text-white font-medium text-center">
                        <h1>Crear Cliente</h1>
                    </div>
                    <CustomersForm/>
                    <div>
                    <ListCustomers/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Customers;
