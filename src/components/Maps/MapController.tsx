import React from 'react';
import { Table, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MapController = ({ onLocationClick, expensesData }) => {
  // const expensesData = [
  //   {
  //     _id: "611f1ef18fb8802c64aeb6c1",
  //     ApprovedBy: "John Doe",
  //     date: new Date("2024-04-24"),
  //     description: "Dinner with clients",
  //     amount: 75,
  //     currency: "USD",
  //     paymentMethod: "Credit Card",
  //     staffName:"Sam",
  //     receiptNumber: "RECEIPT001",
  //     approvalDate: new Date("2024-04-25"),
  //     approvalStatus: "Approved",
  //     latituda: 37.7749,
  //     longitude: -122.4194,
  //     category: "Meals and Entertainment",
  //     notes: "Great meeting with clients",
  //     attachments: ["https://example.com/receipt001.jpg"],
  //     isActive: true,
  //     createdAt: new Date("2024-04-24T10:00:00"),
  //     updatedAt: new Date("2024-04-25T09:30:00"),
  //   },
  //   {
  //     _id: "611f1ef18fb8802c64aeb6c2",
  //     ApprovedBy: "Alice Smith",
  //     date: new Date("2024-04-23"),
  //     description: "Taxi fare",
  //     amount: 30,
  //     currency: "USD",
  //     paymentMethod: "Credit Card",
  //     receiptNumber: "RECEIPT002",
  //     approvalStatus: "Pending",
  //     latituda: 40.7128,
  //     longitude: -74.0060,
  //     category: "Transportation",
  //     notes: "To airport",
  //     attachments: ["https://example.com/receipt002.jpg"],
  //     isActive: true,
  //     createdAt: new Date("2024-04-23T15:00:00"),
  //     updatedAt: new Date("2024-04-23T15:00:00"),
  //   },
  //   // Add more objects as needed...
  // ];

  const handleViewLocation = (record) => {
    onLocationClick(record);
  };
console.log(expensesData)
  const columns = [
    {
      title: 'Staff Name',
      dataIndex: 'staffName',
      render: (text: any, record: any) => <Link to={`/super-admin/view-expances/${record._id}`} style={{ color: 'blue' }}>{text}</Link>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date:any) => <span>{date.toLocaleDateString()}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'category',
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (_, record) => (
        <Button type="link" icon={<EnvironmentOutlined />} onClick={() => handleViewLocation(record)} />
      ),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={expensesData ? expensesData:[]} />
      </div>
    </div>
  );
};

export default MapController;
