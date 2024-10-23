import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import SwitchTheme from "./SwitchTheme"; // Ensure this component is defined
import ExitToApp from "@mui/icons-material/ExitToApp";

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [typeTheme, setTypeTheme] = useState(localStorage.getItem("TypeTheme") || "default");
    const [startHour, setStartHour] = useState(localStorage.getItem("StartHour") || "");
    const [endHour, setEndHour] = useState(localStorage.getItem("EndHour") || "");
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light"); // New state for the current theme
    const location = useLocation();

    const handleTypeTheme = (e) => {
        const newTheme = e.target.value;
        setTypeTheme(newTheme);
        localStorage.setItem("TypeTheme", newTheme);
    };

    const handleStartHourChange = (e) => {
        const newStartHour = e.target.value;
        setStartHour(newStartHour);
        localStorage.setItem("StartHour", newStartHour);
    };

    const handleEndHourChange = (e) => {
        const newEndHour = e.target.value;
        setEndHour(newEndHour);
        localStorage.setItem("EndHour", newEndHour);
    };

    const username = localStorage.getItem("user");
    const rol = localStorage.getItem("tipo");

    const closeSideBar = () => {
        setIsOpen(false);
    };

    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            closeSideBar();
        }
    };

    useEffect(() => {
        const updateThemeBasedOnTime = () => {
            const currentHour = new Date();
            const formattedTime = currentHour.toTimeString().substring(0, 5); // Get HH:mm
            if (typeTheme === "hours") {
                const firstHours = localStorage.getItem("StartHour");
                const endHours = localStorage.getItem("EndHour");

                if (formattedTime >= firstHours && formattedTime < endHours) {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                    setCurrentTheme("dark"); // Update the current theme state
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                    setCurrentTheme("light"); // Update the current theme state
                }
            }
        };

        // Call the function when the component mounts
        updateThemeBasedOnTime();

        const intervalId = setInterval(updateThemeBasedOnTime, 60000); // Check every minute

        window.addEventListener('resize', handleResize);

        // Clean up the effect
        return () => {
            clearInterval(intervalId); // Clear the interval on unmount
            window.removeEventListener('resize', handleResize);
        };
    }, [typeTheme]); // Dependency on typeTheme

    // Set the theme class on the document element based on currentTheme
    useEffect(() => {
        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [currentTheme]);

    return (
        <>
            <header className="block">
                <button
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm0-10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75z"></path>
                    </svg>
                </button>
            </header>

            <aside
                className={`fixed top-0 left-0 z-50 sm:w-56 h-screen transition-transform w-3/4 bg-gray-50 dark:bg-gray-900 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
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
                        {typeTheme === "default" && (
                            <li className="dark:text-white flex items-center">
                                <h1>Modo oscuro</h1>
                                <SwitchTheme />
                                <ExitToApp onClick={() => navigate('/', { replace: true })} />
                            </li>
                        )}
                        {typeTheme !== "default" && (
                            <li className="dark:text-white flex items-end">
                                <ExitToApp onClick={() => navigate('/', { replace: true })} />
                            </li>
                        )}

                        <h1 className="dark:text-white">Hola, {username}</h1>
                        <h2 className="dark:text-white">{rol}</h2>

                        {/* Menu section based on role */}
                        {rol === "ADMINISTRADOR" && (
                            <>
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
                                        <span className="ms-3">Vehículos</span>
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
                                        <span className="ms-3">Estadísticas</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {rol === "GERENTE" && (
                            <>
                                <li>
                                    <Link to='/customers' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ms-3">Clientes</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/vehicles' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ms-3">Vehículos</span>
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
                                        <span className="ms-3">Estadísticas</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {rol === "MECANICO" && (
                            <>
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
                            </>
                        )}
                        <li>
                            <h1 className="dark:text-white">Tipo de tema:</h1>
                            <select className="dark:bg-white bg-slate-300 w-4/5 text-black h-8" value={typeTheme} onChange={handleTypeTheme}>
                                <option value="default">Defecto</option>
                                <option value="hours">Por hora</option>
                                <option value="system">Por sistema</option>
                            </select>
                        </li>
                        {typeTheme === "hours" && (
                            <>
                                <li className="dark:text-white">
                                    <label htmlFor="startHour" className="block">Hora de inicio:</label>
                                    <input
                                        type="time"
                                        id="startHour"
                                        value={startHour}
                                        onChange={handleStartHourChange}
                                        className="dark:bg-white bg-slate-300 w-4/5 text-black h-8"
                                    />
                                </li>
                                <li className="dark:text-white">
                                    <label htmlFor="endHour" className="block">Hora de fin:</label>
                                    <input
                                        type="time"
                                        id="endHour"
                                        value={endHour}
                                        onChange={handleEndHourChange}
                                        className="dark:bg-white bg-slate-300 w-4/5 text-black h-8"
                                    />
                                </li>
                                <br />
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="dark:text-white bg-blue-500 text-white p-2 rounded w-3/4"
                                >
                                    Listo
                                </button>
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
