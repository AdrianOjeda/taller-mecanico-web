import React from "react";
import SideBar from "../components/SideBar";
import ListUsers from "../components/ListUsers";
import UserForm from "../components/UserForm";
function Users() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 min-h-screen w-full lg:flex">
            <div className="w-auto lg:w-56 relative">
                <SideBar />
            </div>
            <main className="flex-grow p-1 relative z-10">
                <div>
                    <div className="text-5xl dark:text-white font-medium text-center">
                        <h1>Crear usuario</h1>
                    </div>
                    <UserForm/>
                </div>
                <div>
                    <ListUsers />
                </div>
            </main>
        </div>
    );
}

export default Users;
