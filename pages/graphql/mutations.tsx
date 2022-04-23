import { gql } from "@apollo/client"


export const QUERY_ALL_USERS = gql`
    query Users {
        allUsers {
            edges {
                node {
                    id
                    email
                    password
                    cedula
                }
            }
        }
    }

`

export const CREATE_USER_MUTATION = gql`
mutation createUser(
      $email: String!
      $password: String!
      $cedula: String!
) {
  createUser(
    input: {
      user: {
        email: $email   
        password: $password
        cedula: $cedula 
      } 
    }
  ) 
  {
    user {
      id
      email
      cedula
    }
  } 
}
     
`

const UPDATE_USER_MUTATION = gql`
mutation updateuser (
  $uid: String!
  $userType: String
  $name: String
  $docNumber: String     
  $docType: String
  $address: String
  $phoneNumber: String
  $email: String    
) {
  updateuser (
    getOneuserInput: {
      uid: $uid
    }
    updateuserInput: {
      userType: $userType
      name: $name
      docNumber:$docNumber
      docType:$docType
      address:$address
      phoneNumber:$phoneNumber
      email:$email

     
    }
  ) {
    id
    name
    docNumber
  }
}
     
`

export const DELETE_USER_MUTATION = gql`

mutation deleteUserbyId (
  $id: Int!
) {
  deleteUserById ( 
    input: {
      id: $id
    }
  ) {
      user {
        id
    }
  }
}
     
`