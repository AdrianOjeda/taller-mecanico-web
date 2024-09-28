import React, { useState } from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function InputForm() {
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
                title:'Inicio de sesion exitoso',
                icon: 'success'
            })
        }
        else{
            Swal.fire({
                title:'Inicio de sesion fallido',
                icon: 'error'
            })
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

    return (
        <div className="flex justify-start items-center flex-col gap-10">
            <input 
                type="text"
                className="w-2/3 h-14 text-center rounded-3xl text-xl"
                placeholder="Nombre de usuario"
                required
                value={formData.user}
                onChange={(event) => handleOnChange('user', event)}
            />
            <input 
                type="password"
                className="w-2/3 h-14 text-center rounded-3xl text-xl"
                placeholder="Contraseña"
                required
                value={formData.password}
                onChange={(event) => handleOnChange('password', event)}
            />
            <Button
                variant="contained"
                className="w-2/4 h-14 bg-black text-white rounded-2xl text-xl"
                onClick={handleClick}
            >
                Iniciar
            </Button>
        </div>
    );
}

export default InputForm;
