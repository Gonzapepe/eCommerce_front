import React, {useState, useRef, useEffect, useContext} from 'react';

// RTK
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/reducers/user';
import { usePostDataToLoginMutation, useGetUserDataFromDBQuery } from '../api/user/users';

// React Router
import { useNavigate } from 'react-router-dom';

// Antd
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { PasswordInput } from 'antd-password-input-strength'
import 'antd/dist/antd.css';

// Cookies
import Cookies from 'js-cookie';

import Auth from '../Auth';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
};

const LogIn = () => {
    const {setAuth} = useContext(Auth);
    
    // Estado del redux
    const dispatch = useDispatch();

    const [postDataToLogin] = usePostDataToLoginMutation();

    // Estado local
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
   
    // React Router
    const navigate = useNavigate();

    // Ref
    const formRef = useRef();

    // Functions
    const handleSubmit = async() => {
        const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        const validatedPassword = passwordRegex.test(userPassword);

        if(userEmail.trim() === '') {
            console.log("email inválido");
            return;
        } else if(userPassword.trim() === '' || userPassword.length <= 7 || !validatedPassword) {
            console.log("password inválido");
            return;
        } else {
            const sendingData = await postDataToLogin({
                email: userEmail,
                password: userPassword,
            })

           const {token} = sendingData.data.data;
           const {email, name} = sendingData.data.data.user;

           dispatch(loginSuccess({
                email,
                name,
           }));

           
           formRef.current.resetFields();
           
           setAuth(true);
           Cookies.set('user', 'loggedIn', {expires: (1/24), path: '/'});
           Cookies.set('token', token, {expires: (1/24), path: '/'});

           navigate('/dashboard');   
        }       
    }

    return (
        <>
            <Form
                {...formItemLayout}
                autoComplete="off"
                onFinish={handleSubmit}
                ref={formRef}
            >
                <Form.Item
                    label="Email"
                    name="email"       
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingrese su email'
                        },

                        {
                            type: "email",
                            message: "Ingrese un email válido"
                        }
                    ]}
                    hasFeedback
                >
                    <Input 
                        placeholder='direccion@gmail.com' 
                        name="email"
                        value={userEmail}
                        onChange = {(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingrese su contraseña'
                        },
                    ]}
                >
                    <PasswordInput
                        label="Contraseña"
                        name="password"
                        placeholder="Contraseña..."
                        value={userPassword}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        Iniciar Sesión
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default LogIn;


/* 
       // Email validation
        if(email.trim() === '') {
            onFinishFailed({
                errors: ['Ingrese un email válido'],
                status: true,
                name: ['email']
            });

            setTimeout(() => {
                onFinishFailed({
                    status: false,
                })
            }, 3000)
        }

        // Password validation
        const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        const validatedPassword = passwordRegex.test(password);

        if(password.trim() === '' || password.length <= 7) {
            onFinishFailed({
                errors: ['Ingrese una contraseña válida'],
                status: true,
                name: ['password']
            })

            setTimeout(() => {
                onFinishFailed({
                    status: false,
                })
            }, 3000)

        } else if(!validatedPassword) {
            onFinishFailed({
                errors: ['La contraseña debe tener al menos 8 dígitos, una mayúscula, una minúscula, un número y un caracter especial'],
                status: true,
                name: ['password']
            })

            setTimeout(() => {
                onFinishFailed({
                    status: false,
                })
            }, 3500)

        } else {
            // setSuccess is used to set an error message in case user makes a mistake.
            setSuccess({
                statusSuccess: true,
                message: 'Inicio de sesión exitoso.'
            });

            setTimeout(() => {
                setSuccess({
                    statusSuccess: false,
                });
            }, 1900);

            // After validation, we send the data           
            const dataFromBackend = await postDataToLogin({
                email,
                password
            });
            // Trying to get the data from the object
            for(const userData of Object.values(dataFromBackend)) {
                const { data } = userData;
                const {token, user} = data;
                
                for(const property of Object.values(user)){
                    localStorage.setItem('user', JSON.stringify(property))
                }

                sessionStorage.setItem('token', token);

                dispatch(loginSuccess(data));
            }
    
            // Reset email & password fields and then push the user to '/' route.
            formRef.current.resetFields();
            navigate('/');
        }
    }

    const onFinishFailed = (errorInfo) => {
        setError(errorInfo)
    };

    const { errors, status } = error;
    const { statusSuccess, message } = success;

*/