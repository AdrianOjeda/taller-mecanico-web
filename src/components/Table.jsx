import React from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from "jspdf";
function Table({ headers, datas, openEditPopup, handleDeleteSubmit, isColor , isRepair}) {

    function generatorNamePdf(reparacion,matricula,nombre,fecha) {
        return reparacion + "_" + matricula + "_" + nombre.slice(0,2) + fecha 
    }

    function handlePDFcreation(row) {
        const doc = new jsPDF();
    
        // Encabezado
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(`Reparación con ID: ${row.idReparacion}`, 105, 20, { align: 'center' });
    
        // Línea debajo del encabezado
        doc.setDrawColor(0, 123, 255);
        doc.line(10, 25, 200, 25);
    
        // Fechas de reparación
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(`Fecha de inicio: ${row.fechaInicio}`, 10, 35);
        doc.text(`Fecha de entrega: ${row.fechaEntrega}`, 140, 35);
    
        // Datos del Cliente
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("Datos del Cliente", 10, 50);
        doc.setDrawColor(0, 123, 255);
        doc.line(10, 52, 200, 52);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(`Nombre: ${row.firstName}`, 10, 60);
    
        // Detalles del Vehículo
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("Datos del Vehículo", 10, 75);
        doc.line(10, 77, 200, 77);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(`Marca: ${row.marcaVehiculo}`, 10, 85);
        doc.text(`Modelo: ${row.modeloVehiculo}`, 10, 93);
        doc.text(`Matrícula: ${row.matriculaVehiculo}`, 10, 101);
    
        // Descripción de la Reparación
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("Descripción de la Reparación", 10, 115);
        doc.line(10, 117, 200, 117);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(`Motivo:`, 10, 125);
        doc.text(row.falla, 10, 133);
    
        // Guardar el PDF
        const namePdf = generatorNamePdf(row.idReparacion, row.matriculaVehiculo, row.firstName, row.fechaEntrega)

        doc.save(namePdf+".pdf");
    }
    

    function formatearFecha(fecha) {
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');  
        
            return `${year}-${month}-${day}`;
        }
        
    function isRepairHeader(isRepair) {
        if (isRepair) {
            return -3
        }
        else{
            return -2
        }
    }

    function isPdf(row) {
        const fechaActual = new Date();
        const fechaFormateada = formatearFecha(fechaActual);
        
        if (row.fechaEntrega.slice(0,4) <= fechaFormateada.slice(0,4)) {
            if (row.fechaEntrega.slice(5,7) <= fechaFormateada.slice(5,7)) {
                if (row.fechaEntrega.slice(8,10) <= fechaFormateada.slice(8,10)) {
                    return true; 
                }
            }
        }
        return false;
    }

    return (
        <div className="flex flex-col mt-8">
            <div className="hidden xl:block bg-white dark:bg-gray-800 overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        {datas.map((row) => (
                            <tr key={row.id}>
                                {headers.slice(0, isRepairHeader(isRepair)).map((header) => (
                                    <td key={header.key} className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-white max-w-44 break-words">
                                        {header.key === 'color' && isColor ? (
                                            <div
                                                className="w-6 h-6 rounded-full border"
                                                style={{ backgroundColor: row[header.key] }}
                                                title={row[header.key]}
                                            />
                                        ) : (
                                            row[header.key]
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <button onClick={() => openEditPopup(row)}><EditIcon /></button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <DeleteIcon 
                                    onClick={() => handleDeleteSubmit(row)} 
                                    className="cursor-pointer transition-transform transform hover:scale-110 hover:text-red-500" 
                                />
                                </td>
                                {isRepair?
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {isPdf(row) ? <PictureAsPdfIcon 
                                    onClick={()=> handlePDFcreation(row)}
                                    
                                    /> : null}
                                </td> :
                                null
                                }
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
