import gql from 'graphql-tag';

export const typeDefs = gql`
  type Phone {
    number: String!
  }

  type Contact {
    created_at: String!
    favorite: Boolean!
    id: Int!
    first_name: String!
    last_name: String!
    phones: [Phone!]!
  }

  type Query {
    getContacts: [Contact]
  }

  type DeletedContact{
    first_name: String!
    last_name: String!
    id: Int!
  }

  type Mutation {
    createContact(input: ContactInput!): Contact
    updateContact(id: Int!, input: ContactInput!): Contact
    deleteContact(id: Int!): DeletedContact
  }

  input ContactInput {
    created_at: String!
    favorite: Boolean!
    first_name: String!
    last_name: String!
    phones: [PhoneInput!]!
  }

  input PhoneInput {
    number: String!
  }

  input ContactBooleanExp {
    name: BooleanExp
  }

  input BooleanExp{
    _like: String
  }
`;