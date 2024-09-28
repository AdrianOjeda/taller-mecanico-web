import React from "react";
import SideBar from "../components/SideBar";
import ListUsers from "../components/ListUsers";

function Users() {
    return (
        <div className="dark:bg-azulBg bg-slate-300 w-screen h-screen flex">
            <div className=" sm:w-56">
            <SideBar />
            </div>

            <main className="flex-grow p-9">
                <ListUsers />
            </main>
        </div>
    );
}

export default Users;
