import { gql } from "@apollo/client"

export const QUERY_ALL_MEMBERS = gql `
    query Members {
        allMembers {
            edges {
                node {
                    id
                    user
                    email
                    password
                    name
                    lastname
                    address
                    phone
                    membertype
                }
            }
        }
    }
`

export const CREATE_MEMBER_MUTATION = gql `
  mutation createMember (
        $user: String!
        $email: String!
        $password: String!
        $name: String!
        $lastname: String!
        $address: String!
        $phone: String!
        $membertype: String!

  ) {
    createMember (
      input: {
        member: {
          user: $user
          email: $email   
          password: $password
          name: $name
          lastname: $lastname
          address: $address
          phone: $phone
          membertype: $membertype
        } 
      }
    ) 
    {
      member {
        id
        user
        email
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
export const REFRESH_QUERY = {      
      refetchQueries: [{ 
          query: QUERY_ALL_MEMBERS
        }]
      }
