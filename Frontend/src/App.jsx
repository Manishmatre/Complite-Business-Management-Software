import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { VehicleProvider } from "./context/VehicleContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import HRDashboard from "./pages/HRDashboard";
import VehicleManagment from "./pages/VehicleManagment";
import FinanceManagement from "./pages/FinanceManagement";
import Settings from "./pages/Settings";
import DocManagement from "./pages/DocManagement";
import AddEmpolyee from "./pages/HRManagement/AddEmpolyee";
import AllEmpolyee from "./pages/HRManagement/AllEmpolyee";
import Attendance from "./pages/HRManagement/Attendance";
import Designations from "./pages/HRManagement/Designations";
import EmpolyeeLeave from "./pages/HRManagement/EmpolyeeLeave";
import EmpolyeeProfile from "./pages/HRManagement/EmpolyeeProfile";
import AddVehicleForm from "./pages/VehiclesPages/AddVehicleForm";
import VehicleDetails from './pages/VehiclesPages/VehicleDetails';
import AddMaintenanceRecord from './pages/VehiclesPages/AddMaintenanceRecord';
import MaintenanceHistory from './pages/VehiclesPages/MaintenanceHistory';
import AddFuelRecord from "./pages/VehiclesPages/AddFuelRecord";
import VehicleInsurance from "./pages/VehiclesPages/VehicleInsurance";
import AddInsurance from "./pages/VehiclesPages/AddInsurance";
import FuelConsumption from "./pages/VehiclesPages/FuelConsumption";
import MaintenanceSchedule from "./pages/VehiclesPages/MaintenanceSchedule";
import VehicleReports from "./pages/VehiclesPages/VehicleReports";
import AllVehicles from "./pages/VehiclesPages/AllVehicles";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VehicleProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/admin-dashboard" />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* HR Section  */}
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="/add-empolyee" element={<AddEmpolyee />} />
              <Route path="/all-empolyees" element={<AllEmpolyee />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/designation" element={<Designations />} />
              <Route path="/empolyee-leave" element={<EmpolyeeLeave />} />
              <Route path="/empolyee-profile" element={<EmpolyeeProfile />} />

              {/* Vehicles Section  */}
              <Route path="/vehicles-dashboard" element={<VehicleManagment />} />
              <Route path="/all-vehicles" element={<AllVehicles />} />
              <Route path="/add-vehicle" element={<AddVehicleForm/>} />
              <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
              <Route path="/add-maintenance/:id" element={<AddMaintenanceRecord />} />
              <Route path="/maintenance-history/:id" element={<MaintenanceHistory />} />
              <Route path="/add-fuel-record" element={<AddFuelRecord />} />
              <Route path="/vehicle-insurance" element={<VehicleInsurance />} />
              <Route path="/add-insurance" element={<AddInsurance />} />
              <Route path="/fuel-consumption" element={<FuelConsumption />} />
              <Route path="/maintenance-schedule" element={<MaintenanceSchedule />} />
              <Route path="/vehicle-reports" element={<VehicleReports />} />

              {/* Doc Section  */}
              <Route path="/docfile-management" element={<DocManagement />} />

              {/* Finance Section  */}
              <Route path="/finance" element={<FinanceManagement />} />

              {/* Settings Section  */}
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </VehicleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
