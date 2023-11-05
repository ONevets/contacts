import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) @client{
      created_at
      favorite
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: Int!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) @client{
      favorite
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!){
    deleteContact(id: $id) @client
  }
`;