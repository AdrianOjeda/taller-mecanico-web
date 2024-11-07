import React from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function Table({ headers, datas, openEditPopup, handleDeleteSubmit, isColor , isRepair}) {

    function handlePDFcreation(row) {
        console.log(row);
        
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
