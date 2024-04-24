// MyModal component
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import API from '../../../API';
import { useAppContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

const { Option } = Select;

function MyModal({ creteRes, setCreateRes }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const { token } = useAppContext();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values: any) => {
    let data = JSON.stringify(values);
    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API}/Admin/create-user`,
      headers: {
        'G.K-Auth_Token': token,
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((response) => {
        setCreateRes(response?.data);
        toast.success("User created successfully.")
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed creating user')
      });

    setVisible(false);
  };

  const getRoles = () => {
    axios.get(`${API}/Admin/get-admin-role`, {
      headers: {
        'G.K-Auth_Token': token 
      }
    })
    .then((response) => {
      setRoles(response?.data?.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      <Button className='bg-blue-600 text-white hover:bg-blue' onClick={showModal}>
        New User
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button className='bg-blue-600 text-white hover:bg-blue' key="submit" type="primary" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="modal_form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            username: '',
            email: '',
            role: '',
          }}
        >
          <Form.Item
            name="username"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please select a role!',
              },
            ]}
          >
            <Select>
              {roles.map((role, index) => (
                <Option key={index} value={role.roleName}>{role.roleName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MyModal;
