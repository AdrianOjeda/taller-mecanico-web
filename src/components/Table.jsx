import React from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function Table({ headers, datas, openEditPopup, handleDeleteSubmit, isColor }) {
    return (
        <div className="flex flex-col mt-8">
            <div className="hidden xl:block bg-white dark:bg-gray-800 overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
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
                                {headers.slice(0, -2).map((header, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-white max-w-44 break-words">
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
                                    <DeleteIcon onClick={() => handleDeleteSubmit(row.id)} className="cursor-pointer transition-transform transform hover:scale-110 hover:text-red-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
