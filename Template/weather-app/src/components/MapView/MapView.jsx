import PropTypes from 'prop-types';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const MapView = ({ lat, lon }) => {
  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>Location: ({lat}, {lon})</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};




MapView.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
};

export default MapView;