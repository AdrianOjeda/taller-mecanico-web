import React from "react";
import { Navigate } from 'react-router-dom';
function PrivateRouter({ element, allowedRoles }) {
    const rol = localStorage.getItem("tipo") ;
    if (!rol) {
        return  <Navigate to="/" />;
    }
    if (!allowedRoles.includes(rol)) {
        return <Navigate to="/" />; 
    }
    return element
}

export default PrivateRouter;