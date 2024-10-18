import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import SwitchTheme from "./SwitchTheme";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const openSideBar = () => {
        setIsOpen(true);
    };

    const closeSideBar = () => {
        setIsOpen(false);
    };

    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            closeSideBar(); 
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className="block">
                <button
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={openSideBar}
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
            </header>
            
            <aside
                className={`fixed top-0 left-0 z-50 sm:w-56 h-screen transition-transform w-3/4 bg-gray-50 dark:bg-gray-900 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {isOpen && (
                            <li className="justify-end lg:hidden flex">
                                <CloseIcon
                                    onClick={closeSideBar}
                                    className="text-dark hover:text-red-700 w-7 h-7 cursor-pointer dark:text-white justify-end"
                                />
                            </li>
                        )}

                        <li className="dark:text-white flex items-center">
                            <h1>Modo oscuro</h1>
                            <SwitchTheme />
                            <ExitToApp onClick={()=>{


                                navigate('/', {
                                    replace: true,
                                });
                            }}/>
                        </li>

                        <li>
                            <Link to="/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Usuarios</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/customers' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Clientes</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/vehicles' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Vehiculos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/repairs' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Reparaciones</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/spareparts' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Piezas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/charts' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Estadisticas</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
