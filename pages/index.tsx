import type { NextPage } from 'next'
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION, QUERY_ALL_USERS } from './graphql/mutations';

const Home: NextPage = () => {

  const [form] = Form.useForm();

  const [createUser, { data, error }] = useMutation(CREATE_USER_MUTATION,
    {   // auto Refresh      
      refetchQueries: [ { query: QUERY_ALL_USERS } ]
    })

  const handleSubmit = (values: any) => {
    createUser((
      {
        variables: {
          email: values.email,
          password: values.password,
          cedula: values.cedula
        }
      }
    ));
    form.resetFields(); 
  }  
  
    if (error) {
      console.log(error)
    }    
    // console.log(values);

    if (data){
    console.log(data);
    }

  return (

    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit}
      size="large"
    >

      <br />
      <div className="wrap">
        <h1>CRUD Usuarios</h1>
        <br /><br />

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Cedula" name="cedula">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>

          <Button type="primary" htmlType="submit">
              Submit            
          </Button>
        </Form.Item>
      </div>
    </Form>

  )
}

export default Home
