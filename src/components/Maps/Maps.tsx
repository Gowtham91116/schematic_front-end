import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useAppContext } from '../../context/AuthContext';

function Map(props: any) {
  const [map, setMap] = useState<L.Map | null>(null);

  const { Latitude = 80.2707, Longitude = 80.2707, staffName = 'Home', expensesData } = props;

  const mapstyles = {
    height: '400px',
    width: '100%',
    border: '1px solid blue',
  };

  async function setLocation() {
    try {
      console.log(Latitude,Longitude);
      if (!map) {
        var mapInstance = L.map('map').setView([Latitude, Longitude], 13);
        setMap(mapInstance);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);
        console.log(staffName,'staffName');
        const popupContent = `<b>${staffName}</b><br>Home ${staffName}`;
        L.marker([Latitude, Longitude]).addTo(mapInstance)
            .bindPopup(popupContent).openPopup();
console.log('if',Latitude,Longitude);
        // expensesData.forEach((expense:any) => {
        //  });

      } else {
console.log('else',Latitude,Longitude);
console.log(staffName,'staffName');

const popupContent = `<b>${staffName}</b>`;
        L.marker([Latitude, Longitude]).addTo(map)
            .bindPopup(popupContent).openPopup();
        map.setView([Latitude, Longitude], 10);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLocation();
  }, [Latitude, Longitude, staffName, expensesData]);

  return (
    <>
      <div id="map" style={mapstyles}></div>
    </>
  );
}

export default Map;
