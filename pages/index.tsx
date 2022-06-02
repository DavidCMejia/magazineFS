import type { NextPage } from 'next'
import { useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';
import { CREATE_MEMBER_MUTATION, REFRESH_QUERY } from './graphql/mutations';
import Link from 'next/link';

const Home: NextPage = () => {

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

    <p>BIENVENIDO INDEX</p>

  )
}

export default Home
