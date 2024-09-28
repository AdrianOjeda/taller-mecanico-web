import React, { useEffect, useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";

function SwitchTheme() {
    const [checked, setChecked] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    const handleChangeTheme = () => {
        setChecked((prev) => !prev);
    };

    useEffect(() => {
        if (checked) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark"); 
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [checked]);

    return (
        <>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChangeTheme} />}
                
            />
        </>
    );
}

export default SwitchTheme;
