import React, { useContext, useEffect, useState } from "react";
import bikeImg from "../../images/bike.png";
import carImg from "../../images/car.png";
import busImg from "../../images/bus.png";
import trainImg from "../../images/train.png";
import "./PricingInfo.css";
import { VehicleContext } from "../../App";
import PeopleIcon from "@material-ui/icons/People";

const PricingInfo = () => {
  const [setSelectedVehicle, selectedVehicle] = useContext(VehicleContext);

  const [vehicleImage, setVehicleImage] = useState("");
  useEffect(() => {
    if (selectedVehicle.name === "Bike") {
      setVehicleImage(bikeImg);
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
  console.log(setSelectedVehicle);
  return (
    <div className="mt-2">
      <div className="d-flex align-items-center justify-content-between p-3 my-auto bgLight">
        <img src={vehicleImage} className="w-25" alt="" />
        <p>{selectedVehicle.name}</p>

        <div className="d-flex align-items-center justify-content-around">
          <PeopleIcon className="mb-3" />
          <p>4</p>
        </div>
        <p>$67</p>
      </div>
    </div>
  );
};

export default PricingInfo;
