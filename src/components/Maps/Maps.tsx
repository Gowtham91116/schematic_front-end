import { useEffect, useState } from 'react';
import L from 'leaflet';

function Map(props: any) {
  const [MapStored, setMapStored] = useState<L.Map | null>(null);
  const { Latitude = 13.0827, Longitude = 80.2707 } = props;

  const mapstyles = {
    height: '400px',
    width: '100%',
    border: '1px solid blue',
  };

  async function setLocation() {
    try {
      if (!MapStored) {
        var map = L.map('map').setView([Latitude, Longitude], 13);
        setMapStored(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; ',
        }).addTo(map);
        L.marker([Latitude, Longitude]).addTo(map);
      } else {
        MapStored.setView(
          [Latitude, Longitude],
          10,
          //     {
          //   animate: true,
          //   duration: 1.0,
          // }
        );
        L.marker([Latitude, Longitude]).addTo(MapStored);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('Longitude,Latitude: ', Longitude, Latitude);
    setLocation();
  }, [Longitude, Latitude]);

  return (
    <>
      <div id="map" style={mapstyles}></div>
    </>
  );
}

export default Map;
