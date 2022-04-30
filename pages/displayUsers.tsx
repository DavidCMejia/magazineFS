import type { NextPage } from 'next';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { QUERY_ALL_USERS , DELETE_USER_MUTATION } from './graphql/mutations';
import { useState } from 'react';

const DisplayUsersData: NextPage = () => {

    const [ isOpenMOdal, setIsOpenModal ] = useState<boolean>(false);
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const [ form ] = Form.useForm();  
    
    const [ deleteUser ] = useMutation(DELETE_USER_MUTATION,
      {   // auto Refresh      
        refetchQueries: [ { query: QUERY_ALL_USERS } ]
      })

      const handleOk = () => {
        setIsOpenModal(false);
      };
    
      const handleCancel = () => {
        setIsOpenModal(false);
      };
      const onEditUser = (values: any) => {
        // createUser((
        //   {
        //     variables: {
        //       email: values.email,
        //       password: values.password,
        //       cedula: values.cedula
        //     }
        //   }
        // ));
        console.log(values)
        form.resetFields(); 
      }  
    if (loading){
        return <h1>DATA IS LOADING</h1>
    }

    if (error){
        console.log(error)
    }  

    const onDeleteUser = (record: any) => {
        
      Modal.confirm({
        title: "Esta seguro que desea eliminar el usuario?",
        okText: "Si",
        cancelText: "No",
        okType: "danger",
        onOk: () => {
          deleteUser((
            {
              variables: {
                id: record.id,
              }
            }
          ));
        },
      });
    }  

    const selectUser = (record: any) => {  
      setIsOpenModal(true);
      //console.log("Editando usuario: ", record.email);

      form.setFieldsValue({
        id: record.id,
        email: record.email,
        password: record.password,
        cedula: record.cedula,

      });      
    }

    const dataTabla =   
    data.allUsers.edges.map(
      (edge:any) => {
          return (                        
                    {
                      id: edge.node.id,
                      email: edge.node.email, 
                      password: edge.node.password,
                      cedula: edge.node.cedula,
                    }                        
                  )}
      )
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
        },
        {
          title: 'Cedula',
          dataIndex: 'cedula',
          key: 'cedula',
        },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          key: 'acciones',
          render: (_: any, record:any) => {
            return (
              <>
                <EditOutlined      
                onClick={() => {
                  selectUser(record);
                }}
                />

                <DeleteOutlined
                  onClick={() => {
                    onDeleteUser(record);
                  }}
                  style={{ color: "red", marginLeft: 20 }}
                />
              </>
            );
          },
        },
      ];                    

  
              
        return ( 
            <>

              <div className="wrap">
                    <div className="main">
                      <Table 
                        dataSource={dataTabla} 
                        columns={columns}
                        size='large'
                      />                                      
                      <Modal 
                        title="Editando Usuario"  
                        cancelText="Cancelar" 
                        visible={isOpenMOdal}
                        onCancel={handleCancel}>
                            <Form
                            form={form}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                            onFinish={onEditUser}
                            // onFinishFailed={onFinishFailed}
                          >                            
                                <Form.Item label="ID" name="id">
                                  <Input />
                                </Form.Item>
                                <Form.Item 
                                label="Email" 
                                name="email" 
                                rules={[{ type: 'email' }]}>
                                  <Input  />
                                </Form.Item>

                                <Form.Item label="Password" name="password">
                                  <Input />
                                </Form.Item>

                                <Form.Item label="Cedula" name="cedula">
                                  <Input />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                <Button
                                type="primary" 
                                htmlType="submit">
                                    Editar            
                                </Button>
                                </Form.Item>

                          </Form>

                      </Modal>
                  </div>
              </div>
            </>
        );
}

export default DisplayUsersData;

