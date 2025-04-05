import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useVehicle } from "../context/VehicleContext";

const VehicleManagment = () => {
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

  // Calculate vehicle statistics
  const vehicleStats = [
    {
      title: "Total Vehicles",
      value: vehicles.length,
      icon: "fa-car",
      color: "bg-blue-50",
    },
    {
      title: "Under Maintenance",
      value: vehicles.filter(v => v.status === "Under Maintenance").length,
      icon: "fa-screwdriver-wrench",
      color: "bg-yellow-50",
    },
    {
      title: "Insurance Expired",
      value: vehicles.filter(v => v.status === "Insurance Expired").length,
      icon: "fa-car-burst",
      color: "bg-red-50",
    },
    {
      title: "Active Vehicles",
      value: vehicles.filter(v => v.status === "Active").length,
      icon: "fa-gas-pump",
      color: "bg-green-50",
    },
  ];

  const handleViewDetails = (id) => {
    navigate(`/vehicle-details/${id}`);
  };

  const handleAddMaintenance = (id) => {
    navigate(`/add-maintenance/${id}`);
  };

  const handleViewMaintenanceHistory = (id) => {
    navigate(`/maintenance-history/${id}`);
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle(id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

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
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Vehicles Management Dashboard
            </p>
            <div className="flex space-x-4">
              <Link
                to="/vehicles-dashboard"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Refresh <i className="fa-solid fa-arrows-rotate"></i>
              </Link>
            </div>
          </div>
          <div className="main-container w-full h-full">
            <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {vehicleStats.map((stat, index) => (
                <div
                  key={index}
                  className={`stats flex items-center justify-between p-4 rounded-lg shadow ${stat.color}`}
                >
                  <div className="state-left">
                    <p className="text-md font-bold text-gray-700">
                      {stat.title}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-700">
                      {stat.value}
                    </h1>
                  </div>
                  <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                    <h1 className="text-lg font-bold text-gray-700">
                      <i className={`fa-solid ${stat.icon}`}></i>
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="charts-container mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
              <div className="vehicles-Table col-span-1 lg:col-span-3 bg-white shadow p-4 rounded-lg overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-md text-gray-600 font-bold">
                    Vehicle List
                  </h2>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search vehicles..."
                      className="border p-2 rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      className="border p-2 rounded-md"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="under maintenance">Under Maintenance</option>
                      <option value="insurance expired">Insurance Expired</option>
                    </select>
                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-gray-800 rounded-2xl">
                    <tr className="rounded-3xl">
                      <th scope="col" className="px-6 py-3">
                        Vehicle Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Insurance Expiry
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Next Maintenance
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 font-semibold text-gray-700 hover:text-blue-600 cursor-pointer py-4" onClick={() => handleViewDetails(vehicle.id)}>
                          {vehicle.name}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {vehicle.number}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {vehicle.type}
                        </td>
                        <td className="px-6 font-semibold py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            vehicle.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : vehicle.status === "Under Maintenance" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatDate(vehicle.insuranceExpireDate)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatDate(vehicle.nextMaintenance)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewDetails(vehicle.id)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View Details"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button 
                              onClick={() => handleAddMaintenance(vehicle.id)}
                              className="text-green-500 hover:text-green-700"
                              title="Add Maintenance"
                            >
                              <i className="fa-solid fa-wrench"></i>
                            </button>
                            <button 
                              onClick={() => handleViewMaintenanceHistory(vehicle.id)}
                              className="text-purple-500 hover:text-purple-700"
                              title="Maintenance History"
                            >
                              <i className="fa-solid fa-history"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete Vehicle"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="Action-btns bg-white shadow p-4 rounded-lg">
                <h2 className="text-md text-gray-600 font-bold mb-4">Quick Actions</h2>
                <div className="action-btns flex flex-col gap-4">
                  <Link 
                    to="/add-vehicle" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    Add New Vehicle
                  </Link>
                  <Link 
                    to="/vehicles-dashboard" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    All Vehicles
                  </Link>
                  <Link 
                    to="/vehicle-insurance" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    Vehicles Insurance
                  </Link>
                  <Link 
                    to="/fuel-consumption" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    Fuel Consumption
                  </Link>
                  <Link 
                    to="/maintenance-schedule" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    Maintenance Schedule
                  </Link>
                  <Link 
                    to="/vehicle-reports" 
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold cursor-pointer text-center"
                  >
                    Vehicle Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagment;
