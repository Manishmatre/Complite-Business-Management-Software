import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const VehicleContext = createContext();

// Custom hook to use the vehicle context
export const useVehicle = () => useContext(VehicleContext);

// Sample vehicle data
const initialVehicles = [
  {
    id: 1,
    name: "Vehicle 1",
    number: "ABC123",
    type: "Car",
    make: "Toyota",
    model: "Camry",
    year: "2020",
    status: "Active",
    insuranceExpireDate: "2025-04-01",
    renewDate: "2025-03-25",
    lastMaintenance: "2023-12-15",
    nextMaintenance: "2024-06-15",
    mileage: 45000,
  },
  {
    id: 2,
    name: "Vehicle 2",
    number: "XYZ456",
    type: "Truck",
    make: "Ford",
    model: "F-150",
    year: "2021",
    status: "Under Maintenance",
    insuranceExpireDate: "2025-05-15",
    renewDate: "2025-05-10",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-07-20",
    mileage: 32000,
  },
  {
    id: 3,
    name: "Vehicle 3",
    number: "DEF789",
    type: "Van",
    make: "Honda",
    model: "Odyssey",
    year: "2019",
    status: "Active",
    insuranceExpireDate: "2024-06-30",
    renewDate: "2024-06-15",
    lastMaintenance: "2024-02-10",
    nextMaintenance: "2024-08-10",
    mileage: 55000,
  },
  {
    id: 4,
    name: "Vehicle 4",
    number: "GHI101",
    type: "SUV",
    make: "Chevrolet",
    model: "Tahoe",
    year: "2022",
    status: "Active",
    insuranceExpireDate: "2025-03-15",
    renewDate: "2025-03-01",
    lastMaintenance: "2024-03-05",
    nextMaintenance: "2024-09-05",
    mileage: 18000,
  },
  {
    id: 5,
    name: "Vehicle 5",
    number: "JKL202",
    type: "Car",
    make: "Hyundai",
    model: "Elantra",
    year: "2021",
    status: "Insurance Expired",
    insuranceExpireDate: "2024-01-15",
    renewDate: "2024-01-01",
    lastMaintenance: "2023-11-20",
    nextMaintenance: "2024-05-20",
    mileage: 38000,
  },
];

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