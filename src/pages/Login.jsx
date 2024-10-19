import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import SwitchTheme from "../components/SwitchTheme";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

function Login(){
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleOnChange = (fieldName, event) => {
        setFormData({
            ...formData,
            [fieldName]: event.target.value,
        });
    };

    const handleClick = async(event) => {
        event.preventDefault();
        console.log(formData);
        
        const response = await fetch('/api/users/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send username and password in the body
        });
    
        if (response.ok) {
            const user = await response.json();
            Swal.fire({
                title: 'Inicio de sesión exitoso',
                icon: 'success'
            });
            navigate('/users', {
                replace: true,
                state: {
                    logged: true,
                    user: user.username, // Pass the username from the response
                }
            });
        } else {
            Swal.fire({
                title: 'Credenciales invalidas',
                icon: 'error'
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
        <section className="h-screen flex items-center justify-center flex-col dark:bg-azulBg bg-slate-300">
            <header className="w-screen flex justify-end dark:text-white items-center ">
                <h1 className="mx-2">Modo oscuro</h1>
                <SwitchTheme/>
            </header>
            
            <div className="w-4/6 h-3/4 bg-slate-700 grid grid-cols-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-2 rounded-3xl shadow-2xl shadow-gray-800 dark:shadow-slate-950">
                <div className="hidden xl:flex row-span-2 justify-center items-center">
                    <img src='.\src\assets\logo.jpg' alt="" className="w-3/4 h-auto rounded-full shadow-2xl" />
                </div>

                <div className="flex text-5xl md:text-6xl lg:text-7xl text-gray-50 font-serif justify-center items-center p-4 md:p-6 lg:p-8">
                    <h1 className="text-center">Iniciar sesión</h1>
                </div>

                <div className="w-full">
                    <div className=" w-full flex justify-start items-center flex-col gap-10">
                        <InputForm
                        className='w-full h-10 text-center rounded-3xl text-xl'
                        placeholder='Usuario'
                        id='username'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={(value) => handleOnChange('username', value)}
                        />
                        <InputForm
                            className='w-full h-10 text-center rounded-3xl text-xl'
                            placeholder='Contraseña'
                            id='password'
                            type='password'
                            name='password'
                            value={formData.password} 
                            onChange={(value) => handleOnChange('password', value)}
                        />

                        <Button
                            variant="contained"
                            className="w-2/4 h-14 bg-black text-white rounded-2xl text-xl"
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
