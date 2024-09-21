import React, { useEffect, useState } from "react";
import {Switch, FormControlLabel} from "@mui/material"
import InputForm from "../components/InputForm";
function Login(){
    const [checked, setChecked] = useState(false);

    const handleChangeTheme= () =>{
        setChecked((prev) => !prev);
    }

    useEffect(()=>{
        if(checked){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark")
        }
    }, [checked] );

    return(
        <>
        <section class="h-screen flex items-center justify-center flex-col dark:bg-azulBg">
            <header class="w-screen flex justify-end dark:text-white">
                
            <FormControlLabel control={<Switch checked={checked} onChange={handleChangeTheme}/>} label="Modo oscuro" />

            </header>
            <div class="w-4/6 h-3/4 bg-slate-700 grid grid-cols-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-2 rounded-3xl shadow-2xl shadow-gray-800  dark:shadow-slate-950	">
                <div class="hidden xl:flex row-span-2 justify-center items-center">
                    <img src='.\src\assets\logo.jpg' alt="" class="w-3/4 h-auto rounded-full shadow-2xl "/>
                </div>
                <div class="flex text-5xl md:text-6xl lg:text-7xl text-gray-50 font-serif justify-center items-center p-4 md:p-6 lg:p-8">
                    <h1 class="text-center">Iniciar sesion</h1>
                </div>
                <InputForm/>
            </div>
        </section>
        
        </>
    );
}

export default Login ;