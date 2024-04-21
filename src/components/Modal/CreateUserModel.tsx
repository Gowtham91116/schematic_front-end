import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

function MyModal() {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values:any) => {
        console.log('Received values:', values);
        setVisible(false);
    };

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
                        name: '',
                        email: '',
                        role: '',
                    }}
                >
                    <Form.Item
                        name="name"
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
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default MyModal;
