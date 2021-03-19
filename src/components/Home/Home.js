import React, {  useEffect, useState } from "react";
// import { VehicleContext } from "../../App";
// import "./Home.css"
import vehicle from "../../FakeData/Vehicle/FakeVehicle.json";
import IndividualVehicle from "./IndividualVehicle";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    setVehicles(vehicle);
    console.log(vehicles);
  }, [vehicles]);
  
  return (
    <div className="center mt-5">
      <div className="card-group row row-cols-1 row-cols-md-4 g-4 padding-right allCard">
        {vehicles.map((vehicle) => (
          <IndividualVehicle key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
