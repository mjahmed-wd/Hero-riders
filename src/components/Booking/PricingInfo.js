import React, { useContext, useEffect, useState } from "react";
import bikeImg from "../../images/bike.png";
import carImg from "../../images/car.png";
import busImg from "../../images/bus.png";
import trainImg from "../../images/train.png";
import { VehicleContext } from "../../App";
import PeopleIcon from "@material-ui/icons/People";

const PricingInfo = () => {
  const [selectedVehicle, setSelectedVehicle] = useContext(VehicleContext);
  const [vehicleImage, setVehicleImage] = useState("");
  useEffect(() => {
    if (selectedVehicle.name === "Bike") {
      setVehicleImage(bikeImg);
      console.log(vehicleImage);
    }
    if (selectedVehicle.name === "Car") {
      setVehicleImage(carImg);
    }
    if (selectedVehicle.name === "Bus") {
      setVehicleImage(busImg);
    }
    if (selectedVehicle.name === "Train") {
      setVehicleImage(trainImg);
    }
  }, [selectedVehicle, vehicleImage]);
  return (
    <div className="d-flex align-items-center justify-content-between p-3 my-auto">
      <img src={vehicleImage} className="w-25" alt="" />
      <p>{selectedVehicle.name}</p>

      <div className="d-flex align-items-center justify-content-around">
        <PeopleIcon className="mb-3" />
        <p>4</p>
      </div>
      <p>$67</p>
    </div>
  );
};

export default PricingInfo;
