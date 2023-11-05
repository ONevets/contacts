import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts {
    getContacts @client {
      created_at
      favorite
      first_name
      last_name
      phones {
        number
      }
      id
    }
  }
`;

export const GET_CONTACT_DETAIL = gql`
query GetContactDetail($id: Int!) {
  getContactDetail(id: $id) @client {
    created_at
    favorite
    first_name
    last_name
    phones {
      number
    }
    id
  }
}
`;

export const GET_CONTACTS_LIST = gql`
  query GetContactsList(
    $limit: Int
    $offset: Int
    $order_by: String
    $where: ContactBooleanExp
  ) {
    getContactsList(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) @client {
      created_at
      favorite
      first_name
      last_name
      phones {
        number
      }
      id
    }
  }
`;
