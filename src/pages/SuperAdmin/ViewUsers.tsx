import React, { useEffect, useState } from 'react';
import { Table, Button, Tag } from 'antd'; // Import Tag component for badges
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import MyModal from '../../components/Modal/CreateUserModel';
import axios from 'axios';
import API from '../../../API';
import { useAppContext } from '../../context/AuthContext';

const ViewUsers = () => {
  const [getUser, setGetUser] = useState([]);
  const { token } = useAppContext();
  const [creteRes, setCreateRes] = useState<object>({});

  const getUsers = () => {
    axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API}/Admin/get-users`,
      headers: {
        'G.K-Auth_Token': token,
      },
    })
      .then((response) => {
        setGetUser(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, [creteRes]); // Fetch users when creteRes changes

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      render: (text: any) => <a style={{ color: 'blue' }}>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'orange'}>
          {isActive ? 'Active' : 'Invited'}
        </Tag>
      ),
    },
    // {
    //   title: 'Actions',
    //   dataIndex: '',
    //   render: (text: any, record: any) => (
    //     <div className='flex gap-3'>
    //       {/* <Button type="text" icon={<EditOutlined style={{ color: 'black' }} />} />
    //       <Button type="text" danger icon={<DeleteOutlined style={{ color: 'red' }} />} /> */}
    //     </div>
    //   ),
    // },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className='flex justify-end w-full min-w-[820px] mb-[24px]'>
        <MyModal creteRes={creteRes} setCreateRes={setCreateRes}/>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={getUser} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewUsers;
