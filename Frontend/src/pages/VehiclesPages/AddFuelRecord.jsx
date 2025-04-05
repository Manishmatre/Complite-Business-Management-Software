import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AddFuelRecord = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicleId: "",
    date: new Date().toISOString().split('T')[0],
    fuelType: "Gasoline",
    quantity: "",
    cost: "",
    mileage: "",
    previousMileage: "",
    location: "",
    notes: ""
  });

  // Sample data for vehicles
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVehicles([
        { id: 1, name: "Vehicle 1", number: "ABC123", currentMileage: 12500 },
        { id: 2, name: "Vehicle 2", number: "XYZ456", currentMileage: 8500 },
        { id: 3, name: "Vehicle 3", number: "DEF789", currentMileage: 15000 },
        { id: 4, name: "Vehicle 4", number: "GHI101", currentMileage: 8000 },
        { id: 5, name: "Vehicle 5", number: "JKL202", currentMileage: 12000 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    const selectedVehicle = vehicles.find(v => v.id.toString() === vehicleId);
    
    setFormData(prev => ({
      ...prev,
      vehicleId,
      mileage: selectedVehicle ? selectedVehicle.currentMileage : "",
      previousMileage: ""
    }));
  };

  const calculateDistance = () => {
    if (formData.mileage && formData.previousMileage) {
      return formData.mileage - formData.previousMileage;
    }
    return 0;
  };

  const calculateEfficiency = () => {
    const distance = calculateDistance();
    if (distance > 0 && formData.quantity) {
      return (distance / formData.quantity).toFixed(1);
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate distance and efficiency
    const distance = calculateDistance();
    const efficiency = calculateEfficiency();
    
    const recordData = {
      ...formData,
      distance,
      efficiency: parseFloat(efficiency)
    };
    
    console.log("Fuel record data:", recordData);
    // Here you would typically send the data to your API
    alert("Fuel record added successfully!");
    navigate("/fuel-consumption");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Add New Fuel Record
            </p>
            <button
              onClick={() => navigate("/fuel-consumption")}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Back to Fuel Records <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="main-container w-full h-full">
            <div className="form-container bg-white shadow p-6 rounded-lg max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="vehicleId"
                      name="vehicleId"
                      value={formData.vehicleId}
                      onChange={handleVehicleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a vehicle</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.number}) - Current Mileage: {vehicle.currentMileage}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity (L) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter fuel quantity in liters"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                      Cost <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Mileage <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="mileage"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current mileage"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="previousMileage" className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Mileage <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="previousMileage"
                      name="previousMileage"
                      value={formData.previousMileage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter previous mileage"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter fuel station location"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter any additional notes"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Calculated Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Distance Traveled</p>
                      <p className="text-lg font-semibold text-gray-700">{calculateDistance()} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Efficiency</p>
                      <p className="text-lg font-semibold text-gray-700">{calculateEfficiency()} km/L</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost per Kilometer</p>
                      <p className="text-lg font-semibold text-gray-700">
                        {formData.cost && calculateDistance() > 0 
                          ? formatCurrency(formData.cost / calculateDistance()) 
                          : formatCurrency(0)} /km
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/fuel-consumption")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Fuel Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFuelRecord; 