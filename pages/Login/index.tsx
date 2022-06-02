import type { NextPage } from 'next'
import { useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';
import { CREATE_MEMBER_MUTATION, REFRESH_QUERY } from './../graphql/mutations';
import Link from 'next/link';

const Login: NextPage = () => {

  const [ form ] = Form.useForm();

  const [ createUser, { data, error } ] = useMutation( CREATE_MEMBER_MUTATION, REFRESH_QUERY );

  const handleSubmit = (values: any) => {
    try {
      console.log(values)
      message.success('Login exitoso');
    } catch (error) {
      message.error({
        content: `El usuario o la contraseña son incorrectos`,
        duration: 5,
      });
      
    }
    
    form.resetFields(); 
  }  

   
    if (error) {
      console.log(error)
    }    
    
    if (data){
    console.log(data);
    }

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: 'This is not a valid email!',
      }
    };

  return (

    <Form
      form={form}
      validateMessages={validateMessages}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit}
      size="large"
    >

      <br />
      <div className="wrap">
        <br/>
        <h1>Iniciar sesión</h1>
        <br /><br />

        <Form.Item label="Email" name="email" rules={[{ type: 'email' }]} required>
          <Input required/>
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password required />
        </Form.Item>

      <p>No estás registrado?<Link href='/Register'> Crea una cuenta</Link></p>
      

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>

          <Button type="primary" htmlType="submit">
            Iniciar sesión      
          </Button>
        </Form.Item>
        <br/>
      </div>
      
    </Form>

  )
}

export default Login
