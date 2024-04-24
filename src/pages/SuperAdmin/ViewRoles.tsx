import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Table, Button } from 'antd'; // Import Button component for actions
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import Edit and Delete icons
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Modal from '../../components/Modal/CreateUserModel';
import MyModal from '../../components/Modal/CreateUserModel';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../../../API';
import { useAppContext } from '../../context/AuthContext';
import { toast } from 'sonner';
// import 'antd/dist/antd.css';

const ViewRoles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  const { manuallyLogged, token, setRoleId, roleId } = useAppContext();
  const location = useLocation();
  const geturl = location.pathname;
  const endpoint = geturl.split("/")[1];
  const navigate = useNavigate();
  console.log('endpoint', endpoint)
  const getRoles = () => {

    axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API}/Admin/get-admin-role`,
      headers: {
        'G.K-Auth_Token': token,
      }
    })
      .then((response: any) => {
        setData(response?.data?.data)
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleDelete = (id: any) => {
    axios.request({
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API}/Admin/delete-admin-role/${id}`,
      headers: {
        'G.K-Auth_Token': token,
      },
    })
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
        toast.success("Role successfully deleted.");
        getRoles(); // Update the roles data after successful deletion
      })
      .catch((error: any) => {
        console.log(error);
        toast.error('Failed to delete role. Please try again later.');
      });
  }
  



  useEffect(() => {
    getRoles()
  }, [])

  // useEffect(()=>{

  // },[roleId])


  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      render: (text: any, record: any) => <Link to={`/edit-roles/${record._id}`} style={{ color: 'blue' }}>{text}</Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (text: any, record: any) => (
        <div className='flex gap-3'>
          <Button onClick={() => { navigate(`/edit-roles/${record._id}`); setRoleId(record.key); }} type="text" icon={<EditOutlined style={{ color: 'black' }} />} />
          <Button onClick={() => {
            handleDelete(record._id);
            }} type="text" danger icon={<DeleteOutlined style={{ color: 'red' }} />} />
        </div>
      ),
    },
  ];




  // // rowSelection object indicates the need for row selection
  // const rowSelection = {
  //   onChange: (selectedRowKeys:any, selectedRows : any) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record:any) => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />

      <p className='flex justify-end mb-[20px]'> <button onClick={() => navigate('/create-roles')} className='text-lg font-bold p-[10px] text-white bg-primary border rounded-md'> Create Role </button> </p>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={data} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewRoles;
