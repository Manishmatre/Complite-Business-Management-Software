import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [vehicle, setVehicle] = useState({
    id: id,
    vehicleName: 'Vehicle 1',
    vehicleType: 'car',
    licensePlate: 'ABC123',
    year: '2020',
    make: 'Toyota',
    model: 'Camry',
    color: 'Silver',
    vin: '1HGCM82633A123456',
    purchaseDate: '2020-01-15',
    purchasePrice: '25000',
    insuranceProvider: 'ABC Insurance',
    insurancePolicyNumber: 'POL123456',
    insuranceExpiryDate: '2025-04-01',
    lastMaintenanceDate: '2023-12-15',
    nextMaintenanceDate: '2024-06-15',
    mileage: '45000',
    fuelType: 'petrol',
    fuelEfficiency: '12.5',
    status: 'active',
    notes: 'Regular maintenance performed. No major issues reported.',
    maintenanceHistory: [
      {
        date: '2023-12-15',
        type: 'Regular Service',
        description: 'Oil change, filter replacement, and general inspection',
        cost: '150.00',
        mileage: '45000',
        performedBy: 'City Auto Service'
      },
      {
        date: '2023-06-10',
        type: 'Regular Service',
        description: 'Oil change, filter replacement, and general inspection',
        cost: '145.00',
        mileage: '35000',
        performedBy: 'City Auto Service'
      },
      {
        date: '2022-12-05',
        type: 'Regular Service',
        description: 'Oil change, filter replacement, and general inspection',
        cost: '140.00',
        mileage: '25000',
        performedBy: 'City Auto Service'
      }
    ],
    fuelRecords: [
      {
        date: '2024-03-15',
        amount: '45.00',
        quantity: '10',
        mileage: '45000',
        location: 'City Gas Station'
      },
      {
        date: '2024-03-01',
        amount: '42.50',
        quantity: '9.5',
        mileage: '44000',
        location: 'City Gas Station'
      },
      {
        date: '2024-02-15',
        amount: '44.00',
        quantity: '10',
        mileage: '43000',
        location: 'City Gas Station'
      }
    ]
  });

  const [formData, setFormData] = useState(vehicle);

  useEffect(() => {
    // In a real application, you would fetch the vehicle data from an API
    // For now, we're using the mock data
    setFormData(vehicle);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend API
    console.log(formData);
    setIsEditing(false);
    // Update the local state
    setVehicle(formData);
  };

  const handleAddMaintenance = () => {
    navigate(`/add-maintenance/${id}`);
  };

  const handleAddFuelRecord = () => {
    navigate(`/add-fuel-record/${id}`);
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Vehicle Details
            </p>
            <button
              onClick={() => navigate('/vehicles-dashboard')}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Back to Vehicles <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          
          <div className="main-container w-full  bg-white p-6 rounded-lg shadow">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                    <input
                      type="text"
                      name="vehicleName"
                      value={formData.vehicleName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="car">Car</option>
                      <option value="truck">Truck</option>
                      <option value="van">Van</option>
                      <option value="bus">Bus</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">VIN (Vehicle Identification Number)</label>
                    <input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Purchase Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Purchase Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Insurance Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Insurance Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Policy Number</label>
                    <input
                      type="text"
                      name="insurancePolicyNumber"
                      value={formData.insurancePolicyNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry Date</label>
                    <input
                      type="date"
                      name="insuranceExpiryDate"
                      value={formData.insuranceExpiryDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Maintenance Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Maintenance Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance Date</label>
                    <input
                      type="date"
                      name="lastMaintenanceDate"
                      value={formData.lastMaintenanceDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance Date</label>
                    <input
                      type="date"
                      name="nextMaintenanceDate"
                      value={formData.nextMaintenanceDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Mileage</label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Fuel Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Fuel Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="cng">CNG</option>
                      <option value="lpg">LPG</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Efficiency (km/l)</label>
                    <input
                      type="number"
                      name="fuelEfficiency"
                      value={formData.fuelEfficiency}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Under Maintenance</option>
                      <option value="inactive">Inactive</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>
                  
                  {/* Additional Notes */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Notes</h3>
                  </div>
                  
                  <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{vehicle.vehicleName}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <i className="fa-solid fa-pen-to-square mr-2"></i> Edit
                    </button>
                    <button
                      onClick={() => navigate(`/vehicles-dashboard`)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <i className="fa-solid fa-arrow-left mr-2"></i> Back
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Vehicle Name</p>
                          <p className="font-medium">{vehicle.vehicleName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Vehicle Type</p>
                          <p className="font-medium capitalize">{vehicle.vehicleType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">License Plate</p>
                          <p className="font-medium">{vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year</p>
                          <p className="font-medium">{vehicle.year}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Make</p>
                          <p className="font-medium">{vehicle.make}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Model</p>
                          <p className="font-medium">{vehicle.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Color</p>
                          <p className="font-medium">{vehicle.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">VIN</p>
                          <p className="font-medium">{vehicle.vin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium capitalize">{vehicle.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Purchase Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Purchase Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Purchase Date</p>
                          <p className="font-medium">{vehicle.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Purchase Price</p>
                          <p className="font-medium">${vehicle.purchasePrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Insurance Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Insurance Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Insurance Provider</p>
                          <p className="font-medium">{vehicle.insuranceProvider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Insurance Policy Number</p>
                          <p className="font-medium">{vehicle.insurancePolicyNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Insurance Expiry Date</p>
                          <p className="font-medium">{vehicle.insuranceExpiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Maintenance Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Maintenance Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Last Maintenance Date</p>
                          <p className="font-medium">{vehicle.lastMaintenanceDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Next Maintenance Date</p>
                          <p className="font-medium">{vehicle.nextMaintenanceDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Current Mileage</p>
                          <p className="font-medium">{vehicle.mileage} km</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fuel Information */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Fuel Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Fuel Type</p>
                          <p className="font-medium capitalize">{vehicle.fuelType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fuel Efficiency</p>
                          <p className="font-medium">{vehicle.fuelEfficiency} km/l</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Notes */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700">{vehicle.notes}</p>
                    </div>
                  </div>
                </div>
                
                {/* Maintenance History */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Maintenance History</h3>
                    <button
                      onClick={handleAddMaintenance}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <i className="fa-solid fa-plus mr-2"></i> Add Maintenance Record
                    </button>
                  </div>
                  <div className="bg-white rounded-md shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mileage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Performed By
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {vehicle.maintenanceHistory.map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.type}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {record.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${record.cost}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.mileage} km
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.performedBy}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Fuel Records */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Fuel Records</h3>
                    <button
                      onClick={handleAddFuelRecord}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <i className="fa-solid fa-plus mr-2"></i> Add Fuel Record
                    </button>
                  </div>
                  <div className="bg-white rounded-md shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mileage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {vehicle.fuelRecords.map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${record.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.quantity} L
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.mileage} km
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.location}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails; 