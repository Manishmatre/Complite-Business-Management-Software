import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  // Sample data for vehicles
  const vehicles = [
    {
      name: "Vehicle 1",
      number: "ABC123",
      insuranceExpireDate: "2025-04-01",
      renewDate: "2025-03-25",
    },
    {
      name: "Vehicle 2",
      number: "XYZ456",
      insuranceExpireDate: "2025-05-15",
      renewDate: "2025-05-10",
    },
    // Add more vehicles as needed
  ];

  // State for weather data
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data from OpenWeatherMap API
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=jabalpur&appid=3bec3b7c4f2c531f4089f3d581aabd60&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />

        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-md italic font-bold text-gray-700">
              Dashboard
            </p>
            <Link
              to="/admin-dashboard"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Dashboard <i className="fa-solid fa-angles-right"></i>
            </Link>
          </div>
          <div className="main-container w-full h-full ">
            <div className="stats-contaie grid grid-cols-4 gap-5">
              <div className="stats flex items-center justify-between bg-white  p-4 rounded-lg shadow">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">
                    Total Employees
                  </p>
                  <h1 className="text-3xl font-bold text-gray-700">100</h1>
                  <p>in this week</p>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full  bg-gray-200">
                  <h1 className="text-lg  font-bold text-gray-700">
                    <i className="fa-solid fa-users"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">
                    Present Employees
                  </p>
                  <h1 className="text-3xl font-bold text-gray-700">90</h1>
                  <p>in this week</p>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full  bg-gray-200">
                  <h1 className="text-lg  font-bold text-gray-700">
                    <i className="fa-solid fa-users"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">
                    Absent Employees
                  </p>
                  <h1 className="text-3xl font-bold text-gray-700">10</h1>
                  <p>in this week</p>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full  bg-gray-200">
                  <h1 className="text-lg  font-bold text-gray-700">
                    <i className="fa-solid fa-users"></i>
                  </h1>
                </div>
              </div>
              <div className="stats flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="state-left">
                  <p className="text-md font-bold text-gray-700">
                    Today's Expense
                  </p>

                  <h1 className="text-3xl  font-bold text-red-500">
                    12,300.00
                  </h1>
                  <p>in this week</p>
                </div>
                <div className="logo w-15 h-15 flex items-center justify-center rounded-full  bg-gray-200">
                  <h1 className="text-lg  font-bold text-gray-700">
                    <i className="fa-solid fa-money-bill-transfer"></i>
                  </h1>
                </div>
              </div>
            </div>

            {/* //This is Dashboard Charts Sections */}
            <div className="charts-container mt-5 grid grid-cols-3 gap-5">
              <div className="vehicles-Table col-span-2 bg-white shadow p-4 rounded-lg">
                <h2 className="text-md text-gray-600 font-bold mb-4">
                  Vehicle Insurance Expiry
                </h2>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white  uppercase bg-gray-800 rounded-2xl">
                    <tr className="rounded-3xl">
                      <th scope="col" className="px-6 py-3">
                        Vehicle Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Insurance Expiry Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Renew Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle, index) => (
                      <tr
                        key={index}
                        className="bg-white  border-b hover:bg-gray-50"
                      >
                        <td className="px-6 font-semibold text-gray-700 hover:text-blue-600 cursor-pointer  py-4">
                          {vehicle.name}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {vehicle.number}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {vehicle.insuranceExpireDate}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          {vehicle.renewDate}
                        </td>
                        <td className="px-6 font-semibold text-gray-700 py-2">
                          <button className="text-white cursor-pointer  hover:bg-blue-600  px-2 py-2 bg-blue-500 rounded-md ">
                            Renew
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="wather-container bg-white shadow p-4 rounded-lg">
                <h2 className="text-md text-gray-600 font-bold mb-4">Current Weather</h2>
                {weather ? (
                  <div className="weather-info pl-5 flex justify-between items-center">
                    <div className="weather-data">
                      <p className="text-md text-gray-600 font-semibold">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {weather.name}
                      </p>
                      
                      <p className="text-5xl text-gray-600  font-bold">
                      <span className="text-2xl"><i className="fa-solid fa-temperature-low"></i></span>{weather.main.temp}°C
                      </p>
                      <p className="text-md font-bold text-gray-500">
                        {weather.weather[0].description}
                      </p>
                      <p className="text-md text-gray-500 font-semibold">
                        <i className="fa-solid fa-droplet"></i> Humidity:{" "}
                        {weather.main.humidity}%
                      </p>
                      <p className="text-md text-gray-500 font-semibold">
                        <i className="fa-solid fa-wind"></i> Wind:{" "}
                        {weather.wind.speed} m/s
                      </p>
                    </div>
                    <div className="weather-img pr-8">
                      <h1 className="text-7xl text-gray-500">
                        <i className="fa-solid fa-cloud-sun "></i>
                      </h1>
                    </div>
                  </div>
                ) : (
                  <p>Loading weather data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
