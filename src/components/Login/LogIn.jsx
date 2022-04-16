import React, { useState, useRef, useEffect, useContext } from "react";
// RTK
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../redux/reducers/user";
// React Router
import { useNavigate } from "react-router-dom";
// Antd
import { Form, Input, Button, Checkbox, Alert } from "antd";
import Auth from "../../Auth";
import "antd/dist/antd.css";
import "./login.css";

// Usar Wrapper y Labelcol para alinear los inputs y los label col
// info: https://ant.design/components/form/
const formItemLayout = {
  labelCol: {
    xs: { span: 24, offset: 5 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24, offset: 5 },
    sm: { span: 14 },
  },
};

const LogIn = () => {
  const { setAuth } = useContext(Auth);
  // Estado del redux
  const dispatch = useDispatch();

  // Estado local
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const { errors } = useSelector((state) => state.user);
  console.log("ERRORES: ", errors);
  // React Router
  const navigate = useNavigate();

  // Ref
  const formRef = useRef();

  // Functions
  const handleSubmit = async () => {
    // const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    // const validatedPassword = passwordRegex.test(userPassword);

    if (userEmail.trim() === "") {
      console.log("email inválido");
      return;
    } else if (userPassword.trim() === "" || userPassword.length <= 7) {
      console.log("password inválido");
      return;
    } else {
      dispatch(postLogin({ email: userEmail, password: userPassword }));
      //   const { token } = sendingData.data.data;
      //   const { email, name } = sendingData.data.data.user;

      formRef.current.resetFields();
      setAuth(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-200 ">
      <div className="max-w-md w-full absolute rounded overflow-hidden shadow-lg bg-white pt-10 my-auto top-1/4 left-1/3 right-1/3">
        <Form
          {...formItemLayout}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit}
          ref={formRef}
          className="w-full"
        >
          <div className="justify-self-center">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su email",
                },

                {
                  type: "email",
                  message: "Ingrese un email válido",
                },
              ]}
              hasFeedback
            >
              <Input
                className=""
                placeholder="direccion@gmail.com"
                name="email"
                value={userEmail}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su contraseña",
              },
            ]}
          >
            <Input.Password
              label="Contraseña"
              name="password"
              placeholder="Contraseña..."
              value={userPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
        <div className="text-red-500">{errors ? errors : null}</div>
      </div>
    </div>
  );
};

export default LogIn;
