import { useState } from "react";

import { Navigate, useLocation } from "react-router-dom";
////________________________________________________________________
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
////________________________________________________________________
import { useAuth, useAxios } from "~/library/hooks";
import { Alert } from "~/library/components";

/**
 * * Login Page
 * ? Responsible For Authentication - Login The User To The System
 */
const Auth = () => {
  const axios = useAxios();
  ////________________________________________________________________
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";
  ////________________________________________________________________
  const { authStatus, login } = useAuth();

  const [alertMessage, setAlertMessage] = useState("");
  ////________________________________________________________________
  /**
   * ? Authenticate The User With The Server And Fetching New Token
   */
  ////________________________________________________________________
  const onSubmit = async (values: any) => {
    const response = await axios
      .post("auth/login", {
        params: { userID: values.username, userPassword: values.password },
        withCredentials: true,
      })
      .then((response) => response.data)
      .catch((response: any) => {
        console.log(response);
        setAlertMessage("wrong user name or password");
      });

    if (response?.userID) {
      login(response);
    }
  };

  return authStatus === "valid" ? (
    <Navigate to={from} replace />
  ) : (
    <div
      style={{
        margin: "auto",
        width: "100%",
        marginTop: "50px",
        maxWidth: "300px",
      }}
    >
      <ConfigProvider direction="ltr">
        {alertMessage && <Alert message={alertMessage} type="warning" />}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};
////______________________________________________________________
export default Auth;
