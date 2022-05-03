import { gql } from "@apollo/client"

export const QUERY_ALL_USERS = gql `
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

export const CREATE_USER_MUTATION = gql `
  mutation createUser (
        $email: String!
        $password: String!
        $cedula: String!
  ) {
    createUser (
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

export const UPDATE_USER_MUTATION = gql `
    mutation updateUserbyId (
      $id: Int!
      $email: String
      $password: String
      $cedula: String 
    ) {  
      updateUserById (
        input: { 
          userPatch: {
            email: $email
            password: $password
            cedula: $cedula
        }, 
          id: $id          
        }
      ) {
        user {
          id
          email
          cedula
        }
      }
    }
`

export const DELETE_USER_MUTATION = gql `

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