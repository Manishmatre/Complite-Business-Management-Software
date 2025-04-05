import React from 'react';

const VehicleTable = ({ vehicles }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Vehicle Name</th>
          <th>Vehicle Type</th>
          <th>License Plate</th>
          <th>Year of Manufacture</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={index}>
            <td>{vehicle.vehicleName}</td>
            <td>{vehicle.vehicleType}</td>
            <td>{vehicle.licensePlate}</td>
            <td>{vehicle.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
