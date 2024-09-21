import React, {useState} from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

function InputForm (){
    const [formData, setFormData] = useState({
        user: '',
        password: '',
    });

    const handleOnChange = (fieldName, event) =>{
        console.log(event.target.value)
        setFormData({
            ...formData,
            [fieldName]:event.target.value,
        })
    }

    const handleClick = async (event) =>{
        event.preventDefault()
        
        
        Swal.fire({
            title: "Trabajando"
        })
    }

    return(
    <>
    
        <div class="flex justify-start items-center flex-col gap-10">
            <input type="text" 
            class="w-2/3	 h-14 text-center rounded-3xl text-xl" 
            placeholder="Nombre de usuario" 
            required 
            value={formData.user}
            onChange={(event) => handleOnChange('user',event)}
            />

            <input type="password" 
            class= "w-2/3 h-14 text-center rounded-3xl text-xl" 
            placeholder="Contraseña" 
            required 
            value={formData.password} 
            onChange={(event) => handleOnChange('password',event)}
            />

            <Button variant="contained" class="w-2/4 h-14 bg-black text-white rounded-2xl text-xl" onClick={handleClick}>Iniciar</Button>
        </div>

    </>)
}

export default InputForm;