import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ReactGoogleMap = (props) => {
  const position = [23.8103, 90.4125];
  return (
    <div className="w-100">
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
