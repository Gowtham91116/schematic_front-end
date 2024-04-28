import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Alert } from 'antd';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import API from '../../../API';
import axios from 'axios';

interface UserData {
  _id: string;
  ApprovedBy: string;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  receiptNumber: string;
  approvalDate?: Date;
  approvalStatus: string;
  latitude: number;
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

const ViewExpances: React.FC<UserViewProps> = () => {
  const token = window.localStorage.getItem('token');
  const { _id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
console.log(userData);
  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const response = await axios.get(`${API}/Admin/get-single-expances/${_id}`, {
          headers: { 'G.K-Auth_Token': token }
        });
        setUserData(response?.data?.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    getExpenseData();
  }, [_id, token]);

  if (loading) {
    return (
      <Spin tip="Loading...">
        <DefaultLayout>
          <Breadcrumb pageName="Roles" />
        </DefaultLayout>
      </Spin>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Roles" />
        <Alert message={error} type="error" />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      {userData && (
        <Descriptions title="User Details" bordered column={1}>
          <Descriptions.Item label="ID">{userData._id}</Descriptions.Item>
          <Descriptions.Item label="Approved By">{!userData.ApprovedBy && "Pending approval ...."}</Descriptions.Item>
          <Descriptions.Item label="Date">{userData.createdAt}</Descriptions.Item>
          <Descriptions.Item label="Description">{userData.description}</Descriptions.Item>
          <Descriptions.Item label="Amount">{userData.amount}</Descriptions.Item>
          <Descriptions.Item label="Currency">{userData.currency}</Descriptions.Item>
          <Descriptions.Item label="Payment Method">{userData.paymentMethod}</Descriptions.Item>
          <Descriptions.Item label="Receipt Number">{userData.receiptNumber}</Descriptions.Item>
          <Descriptions.Item label="Approval Date">{userData.approvalDate ? userData.approvalDate.toLocaleDateString() : 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Approval Status">{userData.approvalStatus}</Descriptions.Item>
          <Descriptions.Item label="Latitude">{userData.latitude}</Descriptions.Item>
          <Descriptions.Item label="Longitude">{userData.longitude}</Descriptions.Item>
          <Descriptions.Item label="Category">{userData.category}</Descriptions.Item>
          <Descriptions.Item label="Attachments">
          {userData.attachments.length > 0 ? (
            <ul>
              {userData.attachments.map((attachment, index) => (
                <li key={index}><a href={attachment}>{attachment}</a></li>
              ))}
            </ul>
          ) : (
            <p>No Attachments</p>
          )}
          </Descriptions.Item>
          <Descriptions.Item label="Active">{userData?.isActive.toString()}</Descriptions.Item>
          <Descriptions.Item label="Created At">{userData?.createdAt}</Descriptions.Item>
          <Descriptions.Item label="Updated At">{userData?.updatedAt}</Descriptions.Item>
        </Descriptions>
      )}
    </DefaultLayout>
  );
};

export default ViewExpances;
