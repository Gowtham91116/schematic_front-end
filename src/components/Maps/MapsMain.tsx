// import React, { useEffect, useState } from 'react';
// import Map from './Maps';
// import MapController from './MapController';
// import axios from 'axios';
// import { useAppContext } from '../../context/AuthContext';
// import API from '../../../API';

// function MapsMain({selectedLocation}) {

//     const { token, expensesData, getUserExpenses } = useAppContext();

    
// useEffect(()=>{
//     getUserExpenses
// },[])
//     // const [expensesData, setExpensesData] = useState([
//     //     {
//     //       _id: "611f1ef18fb8802c64aeb6c1",
//     //       ApprovedBy: "John Doe",
//     //       date: new Date("2024-04-24"),
//     //       description: "Dinner with clients",
//     //       amount: 75,
//     //       staffName:"Sam",
//     //       currency: "USD",
//     //       paymentMethod: "Credit Card",
//     //       receiptNumber: "RECEIPT001",
//     //       approvalDate: new Date("2024-04-25"),
//     //       approvalStatus: "Approved",
//     //       latituda: 37.7749,
//     //       longitude: -122.4194,
//     //       category: "Meals and Entertainment",
//     //       notes: "Great meeting with clients",
//     //       attachments: ["https://example.com/receipt001.jpg"],
//     //       isActive: true,
//     //       createdAt: new Date("2024-04-24T10:00:00"),
//     //       updatedAt: new Date("2024-04-25T09:30:00"),
//     //     },
//     //     {
//     //       _id: "611f1ef18fb8802c64aeb6c2",
//     //       ApprovedBy: "Alice Smith",
//     //       date: new Date("2024-04-23"),
//     //       description: "Taxi fare",
//     //       amount: 30,
//     //       staffName:"John",
//     //       currency: "USD",
//     //       paymentMethod: "Credit Card",
//     //       receiptNumber: "RECEIPT002",
//     //       approvalStatus: "Pending",
//     //       latituda: 40.7128,
//     //       longitude: -74.0060,
//     //       category: "Transportation",
//     //       notes: "To airport",
//     //       attachments: ["https://example.com/receipt002.jpg"],
//     //       isActive: true,
//     //       createdAt: new Date("2024-04-23T15:00:00"),
//     //       updatedAt: new Date("2024-04-23T15:00:00"),
//     //     },
//     //     // Add more objects as needed...
//     //   ]);


//     // const [selectedLocation, setSelectedLocation] = useState({ Latitude: 13, Longitude: 80.2707, ApprovedBy: '' });

//     // function handleLocationClick(record) {
//     //     setSelectedLocation({ Latitude: record.latituda, Longitude: record.longitude, ApprovedBy: record.ApprovedBy });
//     // }

//     return (
//         <div className="flex flex-wrap flex-col my-[25px]">
//             <Map Latitude={selectedLocation.Latitude} Longitude={selectedLocation.Longitude} ApprovedBy={selectedLocation.ApprovedBy} expensesData={expensesData} />
//             <MapController expensesData={expensesData}  onLocationClick={handleLocationClick} />
//         </div>
//     );
// }

// export default MapsMain;
