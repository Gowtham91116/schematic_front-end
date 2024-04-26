import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useAppContext } from '../../context/AuthContext';

function Map(props: any) {
  const [map, setMap] = useState<L.Map | null>(null);

  const { Latitude = 13.0827, Longitude = 80.2707, ApprovedBy = '', expensesData } = props;
console.log(props)
  const mapstyles = {
    height: '400px',
    width: '100%',
    border: '1px solid blue',
  };

  async function setLocation() {
    try {
      if (!map) {
        var mapInstance = L.map('map').setView([Latitude, Longitude], 13);
        setMap(mapInstance);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);
        expensesData.forEach(expense => {
          L.marker([expense.latituda, expense.longitude]).addTo(mapInstance)
            .bindPopup(`<b>${expense.userName}</b>`).openPopup();
        });
      } else {
        map.setView([Latitude, Longitude], 10);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLocation();
  }, [Latitude, Longitude, ApprovedBy, expensesData]);

  return (
    <>
      <div id="map" style={mapstyles}></div>
    </>
  );
}

export default Map;
