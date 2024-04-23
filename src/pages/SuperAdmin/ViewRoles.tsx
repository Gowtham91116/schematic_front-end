import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Table, Button } from 'antd'; // Import Button component for actions
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import Edit and Delete icons
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Modal from '../../components/Modal/CreateUserModel';
import MyModal from '../../components/Modal/CreateUserModel';
// import 'antd/dist/antd.css';

const ViewRoles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text:any) => <a style={{ color: 'blue' }}>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <span>
          {status === 'Active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (text: any, record: any) => (
        <div className='flex gap-3'>
          <Button type="text" icon={<EditOutlined style={{ color: 'black' }} />} />
          <Button type="text" danger icon={<DeleteOutlined style={{ color: 'red' }} />} />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      description: 'Clerk',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Jim Green',
      description: 'Accountant',
      status: 'Inactive',
    },
    {
      key: '3',
      name: 'Joe Black',
      description: 'Staff',
      status: 'Active',
    },
    {
      key: '4',
      name: 'Disabled User',
      description: 'Admin',
      status: 'Inactive',
    },
    {
      key: '5',
      name: 'Joe Black',
      description: 'Staff',
      status: 'Active',
    },
    {
      key: '6',
      name: 'Disabled User',
      description: 'Admin',
      status: 'Inactive',
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
     

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <Table  pagination={{ pageSize: 5 }}  columns={columns} dataSource={data} />
      </div>
    </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};

export default ViewRoles;
