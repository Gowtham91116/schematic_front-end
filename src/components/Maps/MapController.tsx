import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';

const MapController = () => {
  const [data] = useState([
    {
      key: '1',
      roleName: 'Admin',
      description: 'Administrator role with full access',
    },
    {
      key: '2',
      roleName: 'Editor',
      description: 'Editor role with limited access',
    },
    {
      key: '3',
      roleName: 'Viewer',
      description: 'Viewer role with read-only access',
    },
  ]);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-roles/${id}`);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log('Deleted role with ID:', id);
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      render: (text, record) => <Link to={`/edit-roles/${record.key}`} style={{ color: 'blue' }}>{text}</Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (text, record) => (
        <div className='flex gap-3'>
          <Button onClick={() => handleEdit(record.key)} type="text" icon={<EditOutlined style={{ color: 'black' }} />} />
          <Button onClick={() => handleDelete(record.key)} type="text" danger icon={<DeleteOutlined style={{ color: 'red' }} />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={data} />
        </div>
      </div>
      </>
  );
};

export default MapController;
