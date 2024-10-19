import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { Checkbox } from "@mui/material";
import SwitchTheme from "../components/SwitchTheme";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

function Login(){
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        password: '',
    });

    const handleOnChange = (fieldName, event) => {
        setFormData({
            ...formData,
            [fieldName]: event.target.value,
        });
    };

    const handleClick = (event) => {
        event.preventDefault();

        const isTrue = formData.user === 'hola' && formData.password === '123';
        if(isTrue){
            Swal.fire({
                title:'Inicio de sesión exitoso',
                icon: 'success'
            });
        } else {
            Swal.fire({
                title:'Inicio de sesión fallido',
                icon: 'error'
            });
        }

        if (isTrue) {
            navigate('/users', {
                replace: true,
                state: {
                    logged: isTrue,
                    user: formData.user,
                }
            });
        }
    };

    useEffect(() => {
        const isDark = localStorage.getItem("theme");
        if(checked || isDark === "dark"){
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [checked]);

    return (
        <>
        <section className="min-h-screen flex items-center justify-center flex-col dark:bg-azulBg bg-slate-300 p-4 sm:p-8">
            <header className="w-full flex justify-end items-center mb-4">
                <h1 className="mx-2 dark:text-white text-lg sm:text-xl">Modo oscuro</h1>
                <SwitchTheme />
            </header>
            <div className="w-full max-w-7xl h-full bg-slate-700 grid grid-cols-1 lg:grid-cols-2 rounded-3xl shadow-2xl shadow-gray-800 dark:shadow-slate-950 p-4 lg:p-8 gap-6 sm:gap-8">
                <div className="hidden lg:flex justify-center items-center">
                    <img src='.\src\assets\logo.jpg' alt="Logo" className="w-3/4 h-auto rounded-full shadow-2xl" />
                </div>
                <div className="flex flex-col justify-center items-center w-full text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-50 font-serif mb-8">
                        Iniciar sesión
                    </h1>
                    <div className="w-full max-w-md space-y-6">
                        <InputForm
                            className="w-full p-3 text-lg rounded-3xl text-center"
                            placeholder="Usuario"
                            id="user"
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={(value) => handleOnChange('user', value)}
                        />
                        <InputForm
                            className="w-full p-3 text-lg rounded-3xl text-center"
                            placeholder="Contraseña"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={(value) => handleOnChange('password', value)}
                        />
                        <div className="flex items-center justify-center">
                            <span className="mr-2 text-gray-50">Mostrar contraseña</span>
                            <Checkbox
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                color="default"
                            />
                        </div>
                        <Button
                            variant="contained"
                            className="w-full p-3 bg-black text-white rounded-2xl text-xl"
                            onClick={handleClick}
                        >
                            Iniciar
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Login;
