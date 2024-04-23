import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useAppContext } from '../../context/AuthContext';
import axios from 'axios';
import API from '../../../API';
import { useLocation, useParams } from 'react-router-dom';

const CreateRoles = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    workReport: {
      create: false,
      read: false,
      update: false,
      delete: false
    },
    expances: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  });
  const {_id} = useParams();
  const location = useLocation();
  const geturl = location.pathname;
  const endpoint = geturl.split("/")[1];
console.log(endpoint)

const [createResponse,setCreateResponse]=useState({});
console.log(createResponse);
const {manuallyLogged,token,setRoleId,roleId} = useAppContext();

console.log(roleId)

console.log(formData);

  const createRole = (e:any)=>{
    e.preventDefault();
let data = JSON.stringify(formData);

axios.request({
  method: 'post',
  maxBodyLength: Infinity,
  url: `${API}/Admin/create-role`,
  headers: { 
    'G.K-Auth_Token': token, 
    'Content-Type': 'application/json'
  },
  data : data
})
.then((response:any) => {
  setCreateResponse(response?.data?.data);
})
.catch((error:any) => {
  console.log(error);
});

  };


  const getRoleById = (id:any)=>{
    
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${API}/Admin/get-admin-role/${id}`,
  headers: { 
    'G.K-Auth_Token': token
   }
};

axios.request(config)
.then((response) => {
  setFormData(response?.data?.data);
})
.catch((error) => {
  console.log(error);
});

  }

  useEffect(()=>{
    getRoleById(_id)
  },[_id])




  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    if (name === 'workReport' || name === 'expances') {
      setFormData((prevState:any) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          [value]: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      <form onSubmit={createRole}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Roles
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className=' max-w-[480px] w-[100%] flex gap-[45px]'>
              <label className="mb-3 block text-black dark:text-white">
                Role Name
              </label>
              <input
                type="text"
                placeholder="Enter role name"
                name='roleName'
                value={formData.roleName}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className=' max-w-[450px] w-[100%] flex gap-[25px] items-center'>
              <label className="mb-3 block text-black dark:text-white">
                Description
              </label>
              <textarea
                placeholder="Enter description"
                name='description'
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 rounded-t-lg shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto mb-[30px]">
            <div className="w-full max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-5 bg-[#F1F5F9] text-boxdark font-bold px-4 py-2 border-b-2">
                <div>Role</div>
                <div>Create</div>
                <div>Read</div>
                <div>Update</div>
                <div>Delete</div>
              </div>
              <div className="grid grid-cols-5 border-b border-gray-200 px-4 py-2">
  <div>Work Report</div>
  {Object.entries(formData.workReport).map(([key, value]) => (
    <div key={key}>
      <input type="checkbox" name="workReport" value={key} checked={value} onChange={handleChange} />
    </div>
  ))}
</div>
<div className="grid grid-cols-5 border-b border-gray-200 px-4 py-2">
  <div>Expances</div>
  {Object.entries(formData.expances).map(([key, value]) => (
    <div key={key}>
      <input type="checkbox" name="expances" value={key} checked={value} onChange={handleChange} />
    </div>
  ))}
</div>
            </div>
          </div>
          <p className='flex justify-end mb-[20px]'> <button  type='submit' className='text-lg font-bold px-[15px] py-[2px] text-white bg-primary border rounded-md'> Save </button> </p>

        </div>
      </form>
    </DefaultLayout>
  );
};

export default CreateRoles;
