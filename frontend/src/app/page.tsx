// import Image from "next/image";

"use client"

import { Wallet, Undo2 } from "lucide-react";
import { useState } from "react";
import Loading from "./loading";
import LoadEmployee from "./load-employee";

export default function Home() {
  const [sizeEmployee, setSizeEmployee] = useState({width: '50%', height: '1000px'});
  const [statEmployee, setStatEmployee] = useState('home');
  const [fadeOut, setFadeOut] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerAlert = (msg:string, success:boolean) => {
    setAlertMsg(msg);
    setAlertSuccess(success);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleClick = () => {
    if(statEmployee == 'home'){
      setFadeOut(true);
      
      setTimeout(() => {
        setSizeEmployee({
          width: "30%",
          height: "300px"
        });
        setTimeout(() => {
          setStatEmployee('addEmployee');
          setShowForm(true);
          setFadeOut(false);
        },450)
      },500);
    }else{
      setFadeOut(true);
      setTimeout(() => {
        setSizeEmployee({
          width: "50%",
          height: "1000px"
        });
        setTimeout(() => {
          setStatEmployee('home');
          setShowForm(false);
          setFadeOut(false);
        },450);
      }, 500);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    try {
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const response = await fetch("http://localhost:8000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email
        }),
      });
      const data = await response.json();
      if (response.ok) {
        triggerAlert(data.message, true);
      } else {
        triggerAlert(data.message, false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      triggerAlert("An error occurred while adding employee", false);
    }finally{
      setLoading(false);
      handleClick();
    }
  };

  return (
    <>
      <div
        className={`alert-success fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mb-4 w-1/3 ${alertSuccess ? 'bg-green-500' : 'bg-red-500'} text-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${showAlert ? 'translate-y-3' : '-translate-y-full'}`}
      >
        <p>{alertMsg}</p>
      </div>
      <div className="w-screen container pb-8">
        <div className="flex gap-3 justify-center items-center py-6">
          <Wallet size={30} color="#6C63FF"/>
          <h2 className="text-2xl font-semibold text-gray-800">WorkPay</h2>
        </div>
        <div className="flex items-center flex-col gap-12">
          <div className="bg-white border-2 border-[#FFB74D] shadow-lg shadow-[#E6953D]/50 rounded-2xl p-6 w-[95%]">
            <div className="flex w-full justify-between items-center mb-6">
              <div className="flex gap-3">
                <h2 className="text-xl font-semibold text-gray-800">Task Assignment</h2>
              </div>
              <a href="#" className="bg-[#1976D2] text-white min-w-32 min-h-10 shadow-lg rounded-lg flex justify-center items-center">
                Add Task
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden text-sm">
                <thead className="bg-[#546E7A] text-gray-100">
                  <tr>
                    <th className="p-3 border-gray-300">No</th>
                    <th className="p-3 border border-gray-300">Employee Name</th>
                    <th className="p-3 border border-gray-300">Description</th>
                    <th className="p-3 border border-gray-300">Date</th>
                    <th className="p-3 border border-gray-300">Hours Spent</th>
                    <th className="p-3 border border-gray-300">Hourly Rate</th>
                    <th className="p-3 border border-gray-300">Additional Charge</th>
                    <th className="p-3 border border-gray-300">Total Remuneration</th>
                    <th className="p-3 border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-200 transition bg-gray-100">
                    <td className="p-3 border border-gray-300 text-center">1</td>
                    <td className="p-3 border border-gray-300">Muhammad Munzir</td>
                    <td className="p-3 border border-gray-300">Software Engineer</td>
                    <td className="p-3 border border-gray-300">Rp 10.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`bg-white border-2 border-[#4DB6AC] shadow-lg shadow-[#4DB6AC]/50 rounded-2xl p-6 transition-all duration-500 ease-in-out`} style={{width:sizeEmployee.width, maxHeight:sizeEmployee.height}}>
            <div className={`transition-all duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              {!showForm ? (
                <>
                  <div className="flex w-full justify-between items-center mb-6">
                    <div className="flex gap-3">
                      <h2 className="text-xl font-semibold text-gray-800">Employee Data</h2>
                    </div>
                    <button onClick={handleClick} className="bg-[#1976D2] text-white min-w-32 min-h-10 shadow-lg rounded-lg flex justify-center items-center px-4 cursor-pointer">
                      Add Employee
                    </button>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <LoadEmployee />
                  </div>
                  {/* <div className="overflow-x-auto">
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
                        <tr className="hover:bg-gray-200 transition bg-gray-100">
                          <td className="p-3 border border-gray-300 text-center">1</td>
                          <td className="p-3 border border-gray-300">Muhammad Munzir</td>
                          <td className="p-3 border border-gray-300">Software Engineer</td>
                          <td className="p-3 border border-gray-300">Rp 10.000.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                </>
              ) : (
                <>
                  <div className="">
                    <form onSubmit={handleSubmit}>
                      <div className="flex gap-3 items-center">
                        <button className="bg-gray-400 text-white w-24 h-10 shadow-lg rounded-lg flex justify-center items-center px-4 cursor-pointer gap-2" onClick={handleClick} type="button">
                          <Undo2 size={20}/>
                          Back
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">Add Employee</h2>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-col mb-4">
                          <label htmlFor="name" className="w-full">Name</label>
                          <input type="text" placeholder="Enter your name" id="name" name="name" className="py-1 border-b-[1px]"/>
                        </div>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="email" className="w-full">Email</label>
                          <input type="email" placeholder="Enter your email" id="email" name="email" className="py-1 border-b-[1px]"/>
                        </div>
                        <button className="bg-[#1976D2] text-white w-24 h-10 shadow-lg rounded-lg flex justify-center items-center px-4 cursor-pointer gap-2" type="submit">
                          {loading ? (
                            <Loading />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
