import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const VehicleInsurance = () => {
  const navigate = useNavigate();
  const [insuranceRecords, setInsuranceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, expired, expiring

  // Sample data for insurance records
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInsuranceRecords([
        {
          id: 1,
          vehicleId: 1,
          vehicleName: "Vehicle 1",
          vehicleNumber: "ABC123",
          policyNumber: "POL-2023-001",
          provider: "ABC Insurance",
          startDate: "2023-04-01",
          endDate: "2024-04-01",
          premium: 1200,
          coverage: "Comprehensive",
          status: "Active",
          documents: ["policy.pdf", "receipt.pdf"]
        },
        {
          id: 2,
          vehicleId: 2,
          vehicleName: "Vehicle 2",
          vehicleNumber: "XYZ456",
          policyNumber: "POL-2023-002",
          provider: "XYZ Insurance",
          startDate: "2023-05-15",
          endDate: "2024-05-15",
          premium: 1500,
          coverage: "Comprehensive",
          status: "Active",
          documents: ["policy.pdf", "receipt.pdf"]
        },
        {
          id: 3,
          vehicleId: 3,
          vehicleName: "Vehicle 3",
          vehicleNumber: "DEF789",
          policyNumber: "POL-2023-003",
          provider: "DEF Insurance",
          startDate: "2023-06-30",
          endDate: "2024-06-30",
          premium: 1100,
          coverage: "Third Party",
          status: "Active",
          documents: ["policy.pdf", "receipt.pdf"]
        },
        {
          id: 4,
          vehicleId: 4,
          vehicleName: "Vehicle 4",
          vehicleNumber: "GHI101",
          policyNumber: "POL-2023-004",
          provider: "GHI Insurance",
          startDate: "2023-03-15",
          endDate: "2024-03-15",
          premium: 1300,
          coverage: "Comprehensive",
          status: "Active",
          documents: ["policy.pdf", "receipt.pdf"]
        },
        {
          id: 5,
          vehicleId: 5,
          vehicleName: "Vehicle 5",
          vehicleNumber: "JKL202",
          policyNumber: "POL-2023-005",
          provider: "JKL Insurance",
          startDate: "2023-01-15",
          endDate: "2024-01-15",
          premium: 1400,
          coverage: "Comprehensive",
          status: "Expired",
          documents: ["policy.pdf", "receipt.pdf"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRenewInsurance = (id) => {
    navigate(`/renew-insurance/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/insurance-details/${id}`);
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

  const filteredRecords = insuranceRecords.filter(record => {
    if (filter === "all") return true;
    if (filter === "active") return record.status === "Active";
    if (filter === "expired") return record.status === "Expired";
    if (filter === "expiring") {
      const endDate = new Date(record.endDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
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
              Vehicle Insurance Management
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/add-insurance")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add New Insurance
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
                  <p className="text-md font-bold text-gray-700">Total Policies</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {insuranceRecords.length}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-file-contract"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-green-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Active Policies</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {insuranceRecords.filter(r => r.status === "Active").length}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-check-circle"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-red-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Expired Policies</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {insuranceRecords.filter(r => r.status === "Expired").length}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-times-circle"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between p-4 rounded-lg shadow bg-yellow-50">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">Expiring Soon</p>
                  <h1 className="text-3xl font-bold text-gray-700">
                    {insuranceRecords.filter(r => {
                      const endDate = new Date(r.endDate);
                      const today = new Date();
                      const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
                    }).length}
                  </h1>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                  <h1 className="text-lg font-bold text-gray-700">
                    <i className="fa-solid fa-clock"></i>
                  </h1>
                </div>
              </div>
            </div>

            <div className="insurance-records bg-white shadow p-4 rounded-lg overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md text-gray-600 font-bold">Insurance Records</h2>
                <div className="flex items-center space-x-2">
                  <label htmlFor="filter" className="text-sm text-gray-600">Filter:</label>
                  <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="all">All Records</option>
                    <option value="active">Active Policies</option>
                    <option value="expired">Expired Policies</option>
                    <option value="expiring">Expiring Soon</option>
                  </select>
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
                      <th scope="col" className="px-6 py-3">Vehicle</th>
                      <th scope="col" className="px-6 py-3">Policy Number</th>
                      <th scope="col" className="px-6 py-3">Provider</th>
                      <th scope="col" className="px-6 py-3">Coverage</th>
                      <th scope="col" className="px-6 py-3">Start Date</th>
                      <th scope="col" className="px-6 py-3">End Date</th>
                      <th scope="col" className="px-6 py-3">Premium</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.vehicleName} ({record.vehicleNumber})
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.policyNumber}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.provider}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {record.coverage}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatDate(record.startDate)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatDate(record.endDate)}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {formatCurrency(record.premium)}
                        </td>
                        <td className="px-6 font-semibold py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {record.status}
                          </span>
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
                            {record.status === "Expired" && (
                              <button 
                                onClick={() => handleRenewInsurance(record.id)}
                                className="text-green-500 hover:text-green-700"
                                title="Renew Insurance"
                              >
                                <i className="fa-solid fa-sync"></i>
                              </button>
                            )}
                            <button 
                              className="text-purple-500 hover:text-purple-700"
                              title="Download Documents"
                            >
                              <i className="fa-solid fa-download"></i>
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

export default VehicleInsurance; 