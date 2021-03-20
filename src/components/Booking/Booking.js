import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Booking.css";
import RoomIcon from "@material-ui/icons/Room";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
// import { VehicleContext } from "../../App";
import PricingInfo from "./PricingInfo";
// import { Divider } from "@material-ui/core";
import PlaceSelection from "./PlaceSelection";
import GoogleMap from "../GoogleMap/GoogleMap";

const destinations = [
  "Sylhet",
  "Sunamganj",
  "Dhaka",
  "Chittagong",
  "Cox's Bazar",
  "Rangpur",
  "Rajshahi",
];

const Booking = () => {
  // const [selectedVehicle, setSelectedVehicle] = useContext(VehicleContext);
  const [value, setValue] = useState(destinations[0]);
  const filterDestination = destinations.filter((des) => des !== value);
  const [toDestination, setToDestination] = useState(filterDestination[5]);
  const [inputValue, setInputValue] = useState("");
  const [dInputValue, setDInputValue] = useState("");
  const [vehicleAndPriceHiding, setVehicleAndPriceHiding] = useState(false);
  return (
    
        <div className="row">
          <div className="col-md-4 col-xs-12 bookingInfo p-4">
            {vehicleAndPriceHiding === false && (
              <div id="booking-part">
                <PlaceSelection
                  key="1"
                  destinations={destinations}
                  value={value}
                  setValue={setValue}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <PlaceSelection
                  key="2"
                  destinations={filterDestination}
                  value={toDestination}
                  setValue={setToDestination}
                  inputValue={dInputValue}
                  setInputValue={setDInputValue}
                />
                <button
                  className="mb-2"
                  onClick={() => setVehicleAndPriceHiding(true)}
                  style={{color:"white",backgroundColor:"tomato",borderRadius:"5px",paddingLeft:"25px",paddingRight:"25px",paddingTop:"5px",paddingBottom:"5px"}}
                >
                  Search
                </button>
              </div>
            )}
            {/* 2nd part */}
            {vehicleAndPriceHiding === true && (
              <div className="tavelInformation">
                <div className="destinationInformation">
                  {value && (
                    <>
                      <p>
                        <RoomIcon /> From {value}
                      </p>
                      <p>
                        <FlightTakeoffIcon /> To {toDestination}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <PricingInfo />
                  <PricingInfo />
                  <PricingInfo />
                  <PricingInfo />
                </div>
              </div>
            )}
          </div>
          <div className="col-md-8 col-xs-12 p-4">
            <GoogleMap />
          </div>
        </div>
  );
};

export default Booking;
