import React, { useState } from 'react';
import Map from './Maps';
import MapController from './MapController';

function MapsMain() {

    const [Latitude, setLatitude] = useState(13);
    const [Longitude, setLongitude] = useState(80.2707);

    function changeLocation(param: any) {
      setLatitude(param[0]);
      setLongitude(param[1]);
    }

    return (
        <div className="flex flex-wrap flex-col">
             <Map Latitude={Latitude} Longitude={Longitude} />
            <MapController />
        </div>
    );
}

export default MapsMain;
