import { Button, Form, Input, notification, Typography } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { newUser } from "../../actions/user.action";

const { Title } = Typography;

const Register = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: any) => {
    try {
      setIsLoading(true);
      const result = await newUser(value);
      if (result.status === 200) {
        notification.success({
          message: "สำเร็จ",
          description: "ลงทะเบียนสำเร็จ",
        });
        history.push("/login");
      }
      setIsLoading(false);
    } catch (error) {
      notification.error({
        message: "เกิดข้อผิดผลาด",
        description: error?.response?.data?.message,
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1"></div>
      <div className="col-span-1 mt-10">
        <Title className="text-center">Register</Title>
        <Form name="loginfrm" className="w-full mt-10" onFinish={onSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "กรุณากรอกอีเมล" }]}
          >
            <Input size="large" placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input size="large" placeholder="ชื่อ" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
          >
            <Input size="large" placeholder="นามสกุล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input.Password size="large" placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item className="flex justify-center items-center">
            <Button loading={isLoading} className="w-full" htmlType="submit">
              ยืนยัน
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Register;
