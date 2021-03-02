import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Form, Input, Button, notification } from "antd";
import { signIn } from "../../actions/authen.action";
import { AUTH_STORAGE_NAME } from "../../constants/environment";

const { Title } = Typography;

const Login = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const layout = {
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { span: 16 },
  };

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const result = await signIn(value);
      if (result.status === 200) {
        sessionStorage.setItem(AUTH_STORAGE_NAME, result?.data?.accessToken);
        history.push("/");
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
    <div className="grid grid-cols-3 gap-0">
      <div className="col-span-1 "></div>
      <div className="col-span-1 flex justify-center items-center flex-col mt-5">
        <Title level={2} className="flex justufy-center">
          <span>Login</span>
        </Title>
        <Form
          {...layout}
          name="loginfrm"
          className="w-full mt-10"
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "กรุณากรอกอีเมล" }]}
          >
            <Input size="large" placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            className="mb-1"
          >
            <Input.Password size="large" placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <div
              onClick={() => history.push("/register")}
              className="text-right cursor-pointer"
            >
              ยังไม่เคยลงทะเบียนใช่ไหม ?
            </div>
          </Form.Item>
          <Form.Item
            {...tailLayout}
            className="flex justify-center items-center"
          >
            <Button
              loading={isLoading}
              className="w-full rounded-md"
              htmlType="submit"
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Login;
