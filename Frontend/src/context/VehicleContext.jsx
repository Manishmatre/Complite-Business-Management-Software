import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const VehicleContext = createContext();

// Custom hook to use the vehicle context
export const useVehicle = () => useContext(VehicleContext);

// Import vehicle data from JSON file
import vehicleData from '../data/vehicles.json';

// Use imported JSON data as initial vehicles
const initialVehicles = vehicleData;

// Provider component
export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load vehicles from localStorage on initial render
  useEffect(() => {
    try {
      const storedVehicles = localStorage.getItem('vehicles');
      if (storedVehicles) {
        setVehicles(JSON.parse(storedVehicles));
      } else {
        // If no vehicles in localStorage, use initial data
        setVehicles(initialVehicles);
        localStorage.setItem('vehicles', JSON.stringify(initialVehicles));
      }
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    if (vehicles.length > 0) {
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }
  }, [vehicles]);

  // Get a vehicle by ID
  const getVehicleById = (id) => {
    return vehicles.find(vehicle => vehicle.id === parseInt(id));
  };

  // Add a new vehicle
  const addVehicle = (newVehicle) => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const maxId = Math.max(...vehicles.map(v => v.id), 0);
    const vehicleWithId = {
      ...newVehicle,
      id: maxId + 1,
      status: "Active", // Default status
    };
    
    setVehicles([...vehicles, vehicleWithId]);
    return vehicleWithId;
  };

  // Update an existing vehicle
  const updateVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
    return updatedVehicle;
  };

  // Delete a vehicle
  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  // Add maintenance record
  const addMaintenanceRecord = (vehicleId, maintenanceData) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return null;
    
    // In a real app, this would be handled by the backend
    const updatedVehicle = {
      ...vehicle,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: maintenanceData.nextMaintenanceDate,
      maintenanceHistory: [
        ...(vehicle.maintenanceHistory || []),
        {
          id: Date.now(), // Simple ID generation
          date: new Date().toISOString().split('T')[0],
          ...maintenanceData
        }
      ]
    };
    
    updateVehicle(updatedVehicle);
    return updatedVehicle;
  };

  // Add fuel record
  const addFuelRecord = (vehicleId, fuelData) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return null;
    
    // In a real app, this would be handled by the backend
    const updatedVehicle = {
      ...vehicle,
      fuelHistory: [
        ...(vehicle.fuelHistory || []),
        {
          id: Date.now(), // Simple ID generation
          date: new Date().toISOString().split('T')[0],
          ...fuelData
        }
      ]
    };
    
    updateVehicle(updatedVehicle);
    return updatedVehicle;
  };

  // Add insurance record
  const addInsuranceRecord = (vehicleId, insuranceData) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return null;
    
    // In a real app, this would be handled by the backend
    const updatedVehicle = {
      ...vehicle,
      insuranceExpireDate: insuranceData.expiryDate,
      renewDate: insuranceData.renewDate,
      insuranceHistory: [
        ...(vehicle.insuranceHistory || []),
        {
          id: Date.now(), // Simple ID generation
          date: new Date().toISOString().split('T')[0],
          ...insuranceData
        }
      ]
    };
    
    updateVehicle(updatedVehicle);
    return updatedVehicle;
  };

  // Value object to be provided to consumers
  const value = {
    vehicles,
    loading,
    error,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addMaintenanceRecord,
    addFuelRecord,
    addInsuranceRecord
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleContext; 