import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useVehicle } from '../../context/VehicleContext';

const AddVehicleForm = () => {
  const navigate = useNavigate();
  const { addVehicle } = useVehicle();
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleType: '',
    licensePlate: '',
    year: '',
    make: '',
    model: '',
    color: '',
    vin: '',
    purchaseDate: '',
    purchasePrice: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiryDate: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    mileage: '',
    fuelType: '',
    fuelEfficiency: '',
    status: 'active',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.vehicleName) newErrors.vehicleName = "Vehicle name is required";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";
    if (!formData.licensePlate) newErrors.licensePlate = "License plate is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    
    // Date validations
    if (formData.insuranceExpiryDate && new Date(formData.insuranceExpiryDate) < new Date()) {
      newErrors.insuranceExpiryDate = "Insurance expiry date cannot be in the past";
    }
    
    if (formData.nextMaintenanceDate && formData.lastMaintenanceDate && 
        new Date(formData.nextMaintenanceDate) <= new Date(formData.lastMaintenanceDate)) {
      newErrors.nextMaintenanceDate = "Next maintenance date must be after last maintenance date";
    }
    
    // Numeric validations
    if (formData.mileage && isNaN(formData.mileage)) {
      newErrors.mileage = "Mileage must be a number";
    }
    
    if (formData.purchasePrice && isNaN(formData.purchasePrice)) {
      newErrors.purchasePrice = "Purchase price must be a number";
    }
    
    if (formData.fuelEfficiency && isNaN(formData.fuelEfficiency)) {
      newErrors.fuelEfficiency = "Fuel efficiency must be a number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Map form data to the vehicle context format
      const newVehicle = {
        name: formData.vehicleName,
        number: formData.licensePlate,
        type: formData.vehicleType,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        status: formData.status === 'active' ? 'Active' : 
                formData.status === 'maintenance' ? 'Under Maintenance' : 
                formData.status === 'inactive' ? 'Inactive' : 'Retired',
        insuranceExpireDate: formData.insuranceExpiryDate || null,
        renewDate: formData.insuranceExpiryDate ? new Date(new Date(formData.insuranceExpiryDate).setDate(new Date(formData.insuranceExpiryDate).getDate() - 7)).toISOString().split('T')[0] : null,
        lastMaintenance: formData.lastMaintenanceDate || null,
        nextMaintenance: formData.nextMaintenanceDate || null,
        mileage: formData.mileage ? parseInt(formData.mileage) : 0,
        color: formData.color,
        vin: formData.vin,
        purchaseDate: formData.purchaseDate,
        purchasePrice: formData.purchasePrice,
        insuranceProvider: formData.insuranceProvider,
        insurancePolicyNumber: formData.insurancePolicyNumber,
        fuelType: formData.fuelType,
        fuelEfficiency: formData.fuelEfficiency,
        notes: formData.notes
      };
      
      // Add the vehicle using the context
      const addedVehicle = addVehicle(newVehicle);
      
      // Navigate to the vehicle details page
      navigate(`/vehicle-details/${addedVehicle.id}`);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      setErrors({ submit: 'Failed to add vehicle. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Add New Vehicle
            </p>
            <button
              onClick={() => navigate('/vehicles-dashboard')}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Back to Vehicles <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          
          <div className="main-container w-full  bg-white p-6 rounded-lg shadow">
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}
            
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
                    className={`w-full px-3 py-2 border ${errors.vehicleName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {errors.vehicleName && <p className="mt-1 text-sm text-red-600">{errors.vehicleName}</p>}
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Car">Car</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Bus">Bus</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="SUV">SUV</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>}
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.licensePlate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {errors.licensePlate && <p className="mt-1 text-sm text-red-600">{errors.licensePlate}</p>}
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
                    className={`w-full px-3 py-2 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.make ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.model ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
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
                    className={`w-full px-3 py-2 border ${errors.purchasePrice ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.purchasePrice && <p className="mt-1 text-sm text-red-600">{errors.purchasePrice}</p>}
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
                    className={`w-full px-3 py-2 border ${errors.insuranceExpiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.insuranceExpiryDate && <p className="mt-1 text-sm text-red-600">{errors.insuranceExpiryDate}</p>}
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
                    className={`w-full px-3 py-2 border ${errors.nextMaintenanceDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.nextMaintenanceDate && <p className="mt-1 text-sm text-red-600">{errors.nextMaintenanceDate}</p>}
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Mileage</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-3 py-2 border ${errors.mileage ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
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
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                    <option value="LPG">LPG</option>
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
                    className={`w-full px-3 py-2 border ${errors.fuelEfficiency ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.fuelEfficiency && <p className="mt-1 text-sm text-red-600">{errors.fuelEfficiency}</p>}
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
                  onClick={() => navigate('/vehicles-dashboard')}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;
