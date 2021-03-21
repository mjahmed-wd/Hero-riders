import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const ReactGoogleMap = (props) => {
// const {destinationInputValue}=props;
// const [position,setPosition]=useState([23.8103, 90.4125])
    const position=[23.8103, 90.4125]
    // useEffect(()=>{
       
    //     if(destinationInputValue==="Sylhet"){
    //         setPosition([24.8949,91.8687])
    //     }
    //     if(destinationInputValue==="Sunamganj"){
    //         setPosition([25.0667,91.4072])
    //     }
    //     if(destinationInputValue==="Dhaka"){
    //         setPosition([23.8103, 90.4125])
    //     }
    //     if(destinationInputValue==="Chittagong"){
    //         setPosition([22.3569,91.7832])
    //     }
    //     if(destinationInputValue==="Cox's Bazar"){
    //         setPosition([21.4272,92.0058])
    //     }
    //     if(destinationInputValue==="Rangpur"){
    //         setPosition([25.7439,89.2752])
    //     }
    //     if(destinationInputValue==="Rajshahi"){
    //         setPosition([24.3745,88.6042])
    //     }
    // },[destinationInputValue])
    // console.log(position)
    
    return (<div className="w-100">
        
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
    );
};

export default ReactGoogleMap;