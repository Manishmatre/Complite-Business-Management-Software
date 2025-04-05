import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "../assets/2.png";

const HRDashboard = () => {
  // Sample data for HR statistics
  const hrStats = [
    {
      title: "Total Employees",
      value: 150,
      icon: "fa-users",
    },
    {
      title: "New Hires",
      value: 10,
      icon: "fa-user-plus",
    },
    {
      title: "Departments",
      value: 5,
      icon: "fa-building",
    },
    {
      title: "Open Positions",
      value: 3,
      icon: "fa-briefcase",
    },
  ];

  // Sample data for employee leave requests
  const leaveRequests = [
    {
      name: "John Doe",

      leaveType: "Sick Leave",
      fromDate: "2025-03-01",
      toDate: "2025-03-05",
      status: "Approved",
    },
    {
      name: "Jane Smith",
      leaveType: "Vacation",
      fromDate: "2025-03-10",
      toDate: "2025-03-15",
      status: "Pending",
    },
    {
      name: "Alice Johnson",
      leaveType: "Maternity Leave",
      fromDate: "2025-04-01",
      toDate: "2025-06-30",
      status: "Approved",
    },
    // Add more leave requests as needed
  ];

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex w-screen h-full pt-15">
        <Sidebar />

        <div className="w-full h-full overflow-y-scroll bg-blue-50 p-5">
          <div className="page-header flex items-center justify-between">
            <p className="py-3 text-xl italic font-bold text-gray-700">
             HR Dashboard
            </p>
            <Link to="/all-empolyees" className="text-blue-500 hover:text-blue-700 font-semibold">
              All Employee <i className="fa-solid fa-plus"></i>
            </Link>
            <Link
              to="/hr-dashboard"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              HR Dashboard <i className="fa-solid fa-angles-right"></i>
            </Link>
          </div>
          <div className="main-container w-full h-full ">
            <div className="stats-container grid grid-cols-4 gap-5">
              {hrStats.map((stat, index) => (
                <div
                  key={index}
                  className={`stats flex items-center justify-between bg-white p-4 rounded-lg shadow ${stat.color}`}
                >
                  <div className="state-left">
                    <p className="text-xl font-bold text-gray-700">
                      {stat.title}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-700">
                      {stat.value}
                    </h1>
                  </div>
                  <div className="logo w-15 h-15 flex items-center justify-center rounded-full bg-gray-200">
                    <h1 className="text-lg  font-bold text-gray-700">
                      <i className={`fa-solid ${stat.icon}`}></i>
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            {/* Employee Leave Requests Table */}
            <div className="leave-requests-container mt-5 bg-white shadow p-4 rounded-lg">
              <h2 className="text-xl text-gray-600 font-bold mb-4">
                Employee Leave Requests
              </h2>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase   bg-gray-800 ">
                  <tr className="rounded-2xl">
                    <th scope="col" className="px-6 py-3">
                      Employee Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Leave Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      From Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      To Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-2 flex items-center gap-2">
                        <img
                          src={Profile}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />

                        <h1 className="font-bold hover:text-blue-500 cursor-pointer">
                          {request.name}
                        </h1>
                      </td>
                      <td className="px-6 font-semibold text-gray-600 text-md  cursor-pointer py-3">
                        {request.leaveType}
                      </td>
                      <td className="px-6 font-semibold text-gray-600 text-md cursor-pointer py-3">
                        {request.fromDate}
                      </td>
                      <td className="px-6 font-semibold text-gray-600 text-md  cursor-pointer py-3">
                        {request.toDate}
                      </td>
                      <td
                        className={`px-6 py-3 font-bold ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {request.status}
                      </td>
                      <td className="px-6 py-3 flex gap-1">
                        <button className="text-white rounded-lg cursor-pointer hover:underline hover:bg-blue-600 px-2 py-2 bg-blue-500 font-bold ">
                          Approve
                        </button>
                        <button className="text-white rounded-lg  cursor-pointer hover:underline hover:bg-red-600 px-3 py-2 bg-red-500 font-bold ">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
