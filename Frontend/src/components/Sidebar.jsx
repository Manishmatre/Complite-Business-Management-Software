import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const SidebarMenu = [
    {
      title: "Dashboard",
      path: "/admin-dashboard",
      icon: <i className="fa-solid fa-gauge"></i>,
    },
    // {
    //   title: " HR Management",
    //   path: "/hr-dashboard",
    //   icon: <i className="fa-solid fa-users"></i>,
    //   submenu: [
    //     {
    //       title: "Employee List",
    //       path: "/employee-list",
    //       icon: <i className="fa-solid fa-users"></i>,
    //     },
    //   ],
    // },

    {
      title: "Vehicles & Machines",
      path: "/vehicles-dashboard",
      icon: <i className="fa-solid fa-car"></i>,
    },
    // {
    //   title: "Doc & Files",
    //   path: "/docfile-management",
    //   icon: <i className="fa-regular fa-folder-open"></i>,
    // },
    // {
    //   title: "Finance",
    //   path: "/finance",
    //   icon: <i className="fa-solid fa-coins"></i>,
    // },
    // {
    //   title: "Settings",
    //   path: "/settings",
    //   icon: <i className="fa-solid fa-gears"></i>,
    // },
    // {
    //   title: "Add Empolyee",
    //   path: "/add-empolyee",
    //   icon: <i className="fa-solid fa-gears"></i>,
    // },
    // {
    //   title: "Project Management",
    //   path: "/project-management",
    //   icon: <i className="fa-solid fa-gears"></i>,
    // },
    // {
    //     title: "Documentation",
    //     path: "/project-management",
    //     icon: <i className="fa-solid fa-gears"></i>,
    //   },
  ];
  return (
    <ul className="bg-gray-800 w-80 pt-6   h-full">
      {SidebarMenu.map((item, index) => (
        <li key={index} className="w-full px-2 hover:bg-gray-900 ">
          <Link
            to={item.path}
            className="font-semibold px-6 block py-3 text-white text-md"
          >
            {item.icon} {item.title}
          </Link>
          {/* <div className="sub-menu">
            {}
            <li className="w-full px-2 hover:bg-gray-900 ">
              <Link
                to="Subitems"
                className="font-semibold px-6 block py-3 text-white text-md"
              >
                <i className="fa-solid fa-gears"></i> SubItems
              </Link>
              <div className="sub-menu"></div>
            </li>
          </div> */}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
