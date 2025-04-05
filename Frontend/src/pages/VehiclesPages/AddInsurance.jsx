import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AddInsurance = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicleId: "",
    policyNumber: "",
    provider: "",
    startDate: "",
    endDate: "",
    premium: "",
    coverage: "Comprehensive",
    documents: []
  });

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Insurance form data:", formData);
    // Here you would typically send the data to your API
    alert("Insurance policy added successfully!");
    navigate("/vehicle-insurance");
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
              Add New Insurance Policy
            </p>
            <button
              onClick={() => navigate("/vehicle-insurance")}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Back to Insurance <i className="fa-solid fa-arrow-left"></i>
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
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a vehicle</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.number})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Policy Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter policy number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Provider <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="provider"
                      name="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter insurance provider"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="coverage" className="block text-sm font-medium text-gray-700 mb-1">
                      Coverage Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="coverage"
                      name="coverage"
                      value={formData.coverage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Third Party">Third Party</option>
                      <option value="Collision">Collision</option>
                      <option value="Liability">Liability</option>
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
                      value={formData.startDate}
                      onChange={handleChange}
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
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="premium" className="block text-sm font-medium text-gray-700 mb-1">
                      Premium Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="premium"
                        name="premium"
                        value={formData.premium}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Documents
                    </label>
                    <div className="border border-gray-300 rounded-md p-3">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        multiple
                      />
                      {formData.documents.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
                          <ul className="space-y-1">
                            {formData.documents.map((file, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <i className="fa-solid fa-times"></i>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/vehicle-insurance")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Insurance Policy
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

export default AddInsurance; 