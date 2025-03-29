"use client"

import { useEffect, useState } from "react"
import Loading from "./loading"

interface Employee {
    id: number;
    name: string;
    email: string;
}

export default function LoadEmployee(){
    const [loading, setLoading] = useState(true); 
    const [employees, setEmployees] = useState<Employee[]>([]); 

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/employee", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden text-sm">
                        <thead className="bg-[#546E7A] text-gray-100">
                            <tr>
                                <th className="p-3 border-gray-300">No</th>
                                <th className="p-3 border border-gray-300">Name</th>
                                <th className="p-3 border border-gray-300">Email</th>
                                <th className="p-3 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee.id} className="hover:bg-gray-200 transition bg-gray-100">
                                    <td className="p-3 border border-gray-300 text-center">{index + 1}</td>
                                    <td className="p-3 border border-gray-300">{employee.name}</td>
                                    <td className="p-3 border border-gray-300">{employee.email}</td>
                                    <td className="p-3 border border-gray-300">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}