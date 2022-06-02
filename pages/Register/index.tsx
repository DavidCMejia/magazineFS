import type { NextPage } from 'next'
import { useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';
import Link from 'next/link';
import { CREATE_MEMBER_MUTATION, REFRESH_QUERY } from '../graphql/mutations';

const Register: NextPage = () => {

  const [ form ] = Form.useForm();

 const [ createMember, { data, error } ] = useMutation( CREATE_MEMBER_MUTATION, REFRESH_QUERY );

  const handleSubmit = (values: any) => {
    try {
      createMember((
        {
          variables: {
            user: values.user,
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            address: values.address,
            phone: values.phone,
            membertype: values.membertype,
          }
        }
      ));
      message.success('Registro creado con exito');
    } catch (error) {
      message.error({
        content: `Error al guardar el registro: ${error}`,
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
        <h1>Registrarse</h1>
        <br /><br />

        <Form.Item label="User" name="user" required>
          <Input required/>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ type: 'email' }]} required>
          <Input required/>
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password required />
        </Form.Item>

        <Form.Item label="Name" name="name" required>
            <Input required/>
        </Form.Item>

        <Form.Item label="Lastname" name="lastname" required>
            <Input required/>
        </Form.Item>

        <Form.Item label="Address" name="address" required>
            <Input required/>
        </Form.Item>

        <Form.Item label="Phone" name="phone" required>
            <Input required/>
        </Form.Item>

        <Form.Item label="Membertype" name="membertype" required>
            <Input required/>
        </Form.Item>

     

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>

          <Button type="primary" htmlType="submit">
            Registrarse   
          </Button>
        </Form.Item>
        <br/>
      </div>
      
    </Form>

  )
}

export default Register
