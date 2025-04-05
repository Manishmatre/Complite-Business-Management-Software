import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const VehicleReports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState("maintenance");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateReport = () => {
    // Here you would typically generate the report based on the selected type and date range
    console.log("Generating report:", selectedReport, dateRange);
    alert("Report generated successfully!");
  };

  const handleExportReport = () => {
    // Here you would typically export the report to PDF, Excel, etc.
    console.log("Exporting report:", selectedReport);
    alert("Report exported successfully!");
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-lg italic font-bold text-gray-700">
              Vehicle Reports
            </p>
            <button
              onClick={() => navigate("/vehicles-dashboard")}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Back to Vehicles <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="main-container w-full h-full">
            <div className="reports-container bg-white shadow p-6 rounded-lg max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Generate Vehicle Reports</h2>
                <p className="text-gray-600 mb-4">
                  Select a report type and date range to generate detailed reports about your vehicle fleet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reportType"
                    name="reportType"
                    value={selectedReport}
                    onChange={handleReportChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="maintenance">Maintenance Report</option>
                    <option value="fuel">Fuel Consumption Report</option>
                    <option value="insurance">Insurance Report</option>
                    <option value="cost">Cost Analysis Report</option>
                    <option value="utilization">Vehicle Utilization Report</option>
                    <option value="inspection">Vehicle Inspection Report</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Filter
                  </label>
                  <select
                    id="vehicleFilter"
                    name="vehicleFilter"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Vehicles</option>
                    <option value="active">Active Vehicles</option>
                    <option value="maintenance">Vehicles Under Maintenance</option>
                    <option value="idle">Idle Vehicles</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Report
                </button>
                <button
                  onClick={handleExportReport}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Export Report
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Available Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-wrench text-blue-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Maintenance Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Detailed report of all maintenance activities, costs, and schedules.
                    </p>
                    <button
                      onClick={() => setSelectedReport("maintenance")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-gas-pump text-green-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Fuel Consumption Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Analysis of fuel usage, costs, and efficiency across your fleet.
                    </p>
                    <button
                      onClick={() => setSelectedReport("fuel")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-file-contract text-purple-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Insurance Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Overview of insurance policies, coverage, and expiration dates.
                    </p>
                    <button
                      onClick={() => setSelectedReport("insurance")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-chart-line text-yellow-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Cost Analysis Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Comprehensive breakdown of all vehicle-related expenses.
                    </p>
                    <button
                      onClick={() => setSelectedReport("cost")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-tachometer-alt text-red-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Vehicle Utilization Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Analysis of vehicle usage, mileage, and availability.
                    </p>
                    <button
                      onClick={() => setSelectedReport("utilization")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  <div className="report-card p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-clipboard-check text-indigo-500 mr-2"></i>
                      <h4 className="font-semibold text-gray-700">Vehicle Inspection Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Detailed inspection results and compliance status.
                    </p>
                    <button
                      onClick={() => setSelectedReport("inspection")}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Select this report <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReports; 