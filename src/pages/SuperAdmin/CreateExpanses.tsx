import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import API from '../../../API';
import { useAppContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const Currency = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  AUD: 'AUD',
  CAD: 'CAD',
  CHF: 'CHF',
  CNY: 'CNY',
  INR: 'INR',
  SGD: 'SGD',
};

const { Option } = Select;

const ExpenseForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { token } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          // Set the values in the form
          form.setFieldsValue({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
    };

    fetchGeolocation();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Make your API call to submit the expense data
      console.log('Form values:', values);
     
let data = JSON.stringify(values);

axios.request({
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API}/Admin/create-expances`,
    headers: { 
      'G.K-Auth_Token': token, 
      'Content-Type': 'application/json',
    },
    data : data
  })
.then((response:any) => {
    toast.success('Report submited successfully')
    navigate('/super-admin/dashboard')
})
.catch((error:any) => {
    toast.error('Failed to submit expense report. Please try again.')
  console.log(error);
});



    //   form.resetFields();
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Expense" />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ width: 600 }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="staffName"
              label="Staff Name"
              rules={[{ required: true, message: 'Please enter the staff name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter the amount' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="currency"
              label="Currency"
              rules={[{ required: true, message: 'Please select a currency' }]}
            >
              <Select style={{ width: '100%' }}>
                {Object.values(Currency).map((currency: string) => (
                  <Option key={currency} value={currency}>
                    {currency}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[{ required: true, message: 'Please select a payment method' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="Cash">Cash</Option>
                <Option value="Credit Card">Credit Card</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="Travel">Travel</Option>
                <Option value="Meals and Entertainment">Meals and Entertainment</Option>
                <Option value="Accommodation">Accommodation</Option>
                <Option value="Transportation">Transportation</Option>
                <Option value="Miscellaneous">Miscellaneous</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="latitude"
              label="Latitude"
              hidden // Hide the field from the form UI
              initialValue={latitude} // Set the initial value
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="longitude"
              label="Longitude"
              hidden // Hide the field from the form UI
              initialValue={longitude} // Set the initial value
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className='bg-primary' htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExpenseForm;
