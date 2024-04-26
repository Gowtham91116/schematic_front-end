import React from 'react';
import { Descriptions } from 'antd';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface UserData {
  _id: string;
  ApprovedBy: string;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  receiptNumber: string;
  approvalDate?: Date;
  approvalStatus: string;
  latituda: number;
  longitude: number;
  category: string;
  notes?: string;
  attachments: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserViewProps {
  userData: UserData;
}

const userData = {
    _id: "611f1ef18fb8802c64aeb6c1",
    ApprovedBy: "John Doe",
    date: new Date("2024-04-24"),
    description: "Dinner with clients",
    amount: 75,
    currency: "USD",
    paymentMethod: "Credit Card",
    receiptNumber: "RECEIPT001",
    approvalDate: new Date("2024-04-25"),
    approvalStatus: "Approved",
    latituda: 37.7749,
    longitude: -122.4194,
    category: "Meals and Entertainment",
    notes: "Great meeting with clients",
    attachments: ["https://example.com/receipt001.jpg"],
    isActive: true,
    createdAt: new Date("2024-04-24T10:00:00"),
    updatedAt: new Date("2024-04-25T09:30:00"),
  };

const ViewExpances: React.FC<UserViewProps> = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Roles" />
    <Descriptions title="User Details" bordered column={1}>
      <Descriptions.Item label="ID">{userData._id}</Descriptions.Item>
      <Descriptions.Item label="Approved By">{userData.ApprovedBy}</Descriptions.Item>
      <Descriptions.Item label="Date">{userData.date.toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Description">{userData.description}</Descriptions.Item>
      <Descriptions.Item label="Amount">{userData.amount}</Descriptions.Item>
      <Descriptions.Item label="Currency">{userData.currency}</Descriptions.Item>
      <Descriptions.Item label="Payment Method">{userData.paymentMethod}</Descriptions.Item>
      <Descriptions.Item label="Receipt Number">{userData.receiptNumber}</Descriptions.Item>
      <Descriptions.Item label="Approval Date">{userData.approvalDate ? userData.approvalDate.toLocaleDateString() : 'N/A'}</Descriptions.Item>
      <Descriptions.Item label="Approval Status">{userData.approvalStatus}</Descriptions.Item>
      <Descriptions.Item label="Latitude">{userData.latituda}</Descriptions.Item>
      <Descriptions.Item label="Longitude">{userData.longitude}</Descriptions.Item>
      <Descriptions.Item label="Category">{userData.category}</Descriptions.Item>
      <Descriptions.Item label="Notes">{userData.notes}</Descriptions.Item>
      <Descriptions.Item label="Attachments">
        <ul>
          {userData.attachments.map((attachment, index) => (
            <li key={index}><a href={attachment}>{attachment}</a></li>
          ))}
        </ul>
      </Descriptions.Item>
      <Descriptions.Item label="Active">{userData.isActive.toString()}</Descriptions.Item>
      <Descriptions.Item label="Created At">{userData.createdAt.toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label="Updated At">{userData.updatedAt.toLocaleString()}</Descriptions.Item>
    </Descriptions>
    </DefaultLayout>
  );
};

export default ViewExpances;
