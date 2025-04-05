import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const FuelConsumption = () => {
  const navigate = useNavigate();
  const [fuelRecords, setFuelRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, thisMonth, lastMonth
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [vehicles, setVehicles] = useState([]);

  // Sample data for vehicles
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVehicles([
        { id: 1, name: "Vehicle 1", number: "ABC123" },
        { id: 2, name: "Vehicle 2", number: "XYZ456" },
        { id: 3, name: "Vehicle 3", number: "DEF789" },
        { id: 4, name: "Vehicle 4", number: "GHI101" },
        { id: 5, name: "Vehicle 5", number: "JKL202" }
      ]);
    }, 500);
  }, []);

  // Sample data for fuel records
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFuelRecords([
        {
          id: 1,
          vehicleId: 1,
          vehicleName: "Vehicle 1",
          vehicleNumber: "ABC123",
          date: "2024-03-15",
          fuelType: "Gasoline",
          quantity: 45.5,
          cost: 120.75,
          mileage: 12500,
          previousMileage: 12000,
          distance: 500,
          efficiency: 11.0, // km/L or miles/gallon
          location: "Gas Station A",
          notes: "Regular maintenance"
        },
        {
          id: 2,
          vehicleId: 2,
          vehicleName: "Vehicle 2",
          vehicleNumber: "XYZ456",
          date: "2024-03-10",
          fuelType: "Diesel",
          quantity: 60.0,
          cost: 180.00,
          mileage: 8500,
          previousMileage: 8000,
          distance: 500,
          efficiency: 8.3,
          location: "Gas Station B",
          notes: "Long trip"
        },
        {
          id: 3,
          vehicleId: 3,
          vehicleName: "Vehicle 3",
          vehicleNumber: "DEF789",
          date: "2024-03-05",
          fuelType: "Gasoline",
          quantity: 40.0,
          cost: 110.00,
          mileage: 15000,
          previousMileage: 14500,
          distance: 500,
          efficiency: 12.5,
          location: "Gas Station C",
          notes: ""
        },
        {
          id: 4,
          vehicleId: 4,
          vehicleName: "Vehicle 4",
          vehicleNumber: "GHI101",
          date: "2024-02-28",
          fuelType: "Gasoline",
          quantity: 35.0,
          cost: 95.00,
          mileage: 8000,
          previousMileage: 7500,
          distance: 500,
          efficiency: 14.3,
          location: "Gas Station A",
          notes: "City driving"
        },
        {
          id: 5,
          vehicleId: 5,
          vehicleName: "Vehicle 5",
          vehicleNumber: "JKL202",
          date: "2024-02-20",
          fuelType: "Diesel",
          quantity: 55.0,
          cost: 165.00,
          mileage: 12000,
          previousMileage: 11500,
          distance: 500,
          efficiency: 9.1,
          location: "Gas Station B",
          notes: "Highway driving"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const handleAddFuelRecord = () => {
    navigate("/add-fuel-record");
  };

  const handleViewDetails = (id) => {
    navigate(`/fuel-record-details/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateTotalCost = () => {
    return fuelRecords.reduce((total, record) => total + record.cost, 0);
  };

  const calculateAverageEfficiency = () => {
    if (fuelRecords.length === 0) return 0;
    const totalEfficiency = fuelRecords.reduce((total, record) => total + record.efficiency, 0);
    return (totalEfficiency / fuelRecords.length).toFixed(1);
  };

  const filteredRecords = fuelRecords.filter(record => {
    // Filter by vehicle
    if (selectedVehicle !== "all" && record.vehicleId.toString() !== selectedVehicle) {
      return false;
    }

    // Filter by time period
    const recordDate = new Date(record.date);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    if (filter === "thisMonth" && recordDate < firstDayOfMonth) {
      return false;
    }
    if (filter === "lastMonth" && (recordDate < firstDayOfLastMonth || recordDate > lastDayOfLastMonth)) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Fuel Consumption Tracking
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleAddFuelRecord}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Fuel Record
              </button>
              <button
                onClick={() => navigate("/vehicles-dashboard")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Back to Vehicles <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
          </div>

          <div className="main-container w-full h-full">
            <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-blue-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Total Records</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {fuelRecords.length}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-gas-pump"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-green-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Total Cost</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {formatCurrency(calculateTotalCost())}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-yellow-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Avg. Efficiency</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {calculateAverageEfficiency()} km/L
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-chart-line"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-purple-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Total Distance</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {fuelRecords.reduce((total, record) => total + record.distance, 0)} km
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-road"></i>
                  </h1>
                </div>
              </div>
            </div>

            <div className="fuel-records bg-white shadow p-4 rounded-lg overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md text-gray-600 font-bold">Fuel Consumption Records</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="vehicle" className="text-sm text-gray-600">Vehicle:</label>
                    <select
                      id="vehicle"
                      value={selectedVehicle}
                      onChange={handleVehicleChange}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="all">All Vehicles</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.number})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="filter" className="text-sm text-gray-600">Time Period:</label>
                    <select
                      id="filter"
                      value={filter}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="thisMonth">This Month</option>
                      <option value="lastMonth">Last Month</option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-gray-800 rounded-2xl">
                    <tr className="rounded-3xl">
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Vehicle</th>
                      <th scope="col" className="px-6 py-3">Fuel Type</th>
                      <th scope="col" className="px-6 py-3">Quantity (L)</th>
                      <th scope="col" className="px-6 py-3">Cost</th>
                      <th scope="col" className="px-6 py-3">Mileage</th>
                      <th scope="col" className="px-6 py-3">Distance (km)</th>
                      <th scope="col" className="px-6 py-3">Efficiency (km/L)</th>
                      <th scope="col" className="px-6 py-3">Location</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.vehicleName} ({record.vehicleNumber})
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.fuelType}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.quantity.toFixed(1)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatCurrency(record.cost)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.mileage.toLocaleString()}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.distance}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.efficiency.toFixed(1)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.location}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewDetails(record.id)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View Details"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button 
                              className="text-green-500 hover:text-green-700"
                              title="Edit Record"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700"
                              title="Delete Record"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelConsumption; 