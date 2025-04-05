import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useVehicle } from "../../context/VehicleContext";
import VehicleTable from "./VehicleTable";

const AllVehicles = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, deleteVehicle } = useVehicle();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter vehicles based on search term and status filter
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      vehicle.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <h1 className="py-3 text-lg italic font-bold text-gray-700">
              All Vehicles List
            </h1>
            <div className="flex space-x-4">
              <Link
                to="/add-vehicle"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add New Vehicle
              </Link>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <VehicleTable vehicles={filteredVehicles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllVehicles;
