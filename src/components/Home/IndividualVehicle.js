import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { VehicleContext } from "../../App";

const IndividualVehicle = (props) => {
  let history = useHistory();
    const [setSelectedVehicle] = useContext(VehicleContext);
  const { name, image } = props.vehicle;
const booking=()=>{
  setSelectedVehicle({name})
  history.push("/booking");
}
 
  return (
      <div className="col" onClick={()=>booking()} style={{cursor:"pointer"}}>
      <div className="card h-100">
        <img src={image} className="card-img-top pt-5 pr-5 pl-5 pb-1" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
        </div>
      </div>
    </div>
    
  );
};

export default IndividualVehicle;
