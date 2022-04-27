/* eslint-disable react/jsx-key */
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { QUERY_ALL_USERS , DELETE_USER_MUTATION } from './graphql/mutations';
import { useState } from 'react';

function DisplayUsersData(){

    const [isOpenMOdal, setIsOpenModal] = useState<boolean>(false);
    const {data, loading, error} = useQuery(QUERY_ALL_USERS);  

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

    if (loading){
        return <h1>DATA IS LOADING</h1>
    }

    // if (data){
    //     console.log(data)
    // }

    if (error){
        console.log(error)
    }  

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
                onEditUser(record);
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
           
      const onEditUser = (record: any) => {  
        setIsOpenModal(true);
        console.log("Editando usuario: ", record);
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
        // console.log("eliminado usuario: ", record.id);
      }  

  const dataTabla =   
    data.allUsers.edges.map(
      (edge:any) => {
          return (                        
                    {
                      id: edge.node.id,
                      email: edge.node.email, 
                      cedula: edge.node.cedula,
                    }                        
                  )}
      )
        
  // const ver = () => {
  //   console.log(epa)
  // }
      
        return ( 
             <>

             {/* <Button>Log</Button> */}

             <div className="wrap">
                  <div className="main">
                    <Table 
                      dataSource={dataTabla} 
                      columns={columns}
                      size='large'
                    />                                      
                    <Modal 
                      title="Basic Modal" 
                      visible={isOpenMOdal}
                      okText="Guardar"
                      cancelText="Cancelar" 
                      onOk={handleOk}
                      onCancel={handleCancel}>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                    </Modal>
                </div>
             </div>
             </>
        );
}

export default DisplayUsersData;

