import { Resolvers } from "@apollo/client";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/storage";
import { GET_CONTACTS, GET_CONTACTS_LIST } from "./queries";

const resolvers: Resolvers = {
  Query: {
    getContacts: () => {
      return getLocalStorageItem("contacts") || [];
    },

    getContactDetail: (_, { id }, { client }) => {
      const data = client.readQuery({
        query: GET_CONTACTS,
      });

      const contacts = data.getContacts;

      let contactDetail;

      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          contactDetail = contacts[i];
          break;
        }
      }

      return contactDetail;
    },

    getContactsList: (_, { limit, offset, order_by, where }, { client }) => {
      console.log("getContactsList")
      const data = client.readQuery({
        query: GET_CONTACTS,
      });
      
      const contacts = data.getContacts
      console.log("getcontactslist data: ", data)

      if(limit && offset){
        console.log("test")
      }
      console.log(limit)
      console.log(offset)
      console.log(order_by)
      console.log(where)
      

      return contacts
    },
  },
  Mutation: {
    createContact: (_, { input }, { client }) => {
      const data = client.readQuery({
        query: GET_CONTACTS,
      });

      const newContact = { ...input, id: Date.now() };

      // Create a new array by concatenating the existing array with the new contact

      let updatedContacts;
      if (data === null) {
        updatedContacts = [newContact];
      } else {
        updatedContacts = [...data.getContacts, newContact];
      }

      client.writeQuery({
        query: GET_CONTACTS,
        data: { getContacts: updatedContacts }, // Ensure data is structured correctly
      });

      setLocalStorageItem("contacts", updatedContacts);
      return newContact;
    },

    updateContact: (_, { id, input }, { client }) => {
      const data = client.readQuery({
        query: GET_CONTACTS,
      });

      const newContacts = data.getContacts;
      // Create a new array by concatenating the existing array with the new contact

      let updatedContacts;
      for (let i = 0; i < newContacts.length; i++) {
        console.log(newContacts[i]);
        if (newContacts[i].id === id) {
          const before = newContacts.slice(0, i);
          updatedContacts = [...before, input];

          const after = newContacts.slice(i + 1);
          updatedContacts = updatedContacts.concat(after);
          break;
        }
      }

      console.log("updated: ", updatedContacts)
      client.writeQuery({
        query: GET_CONTACTS,
        data: { getContacts: updatedContacts }, // Ensure data is structured correctly
      });

      setLocalStorageItem("contacts", updatedContacts);
      return updatedContacts;
    },

    deleteContact: (_, { id }, { client }) => {
      const data = client.readQuery({
        query: GET_CONTACTS,
      });

      const contacts = data.getContacts;

      let updatedContacts;
      let deletedContact;

      // O(N) But nothing we can really do in this case since it's within localStorage
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          deletedContact = {
            first_name: contacts[i].first_name,
            last_name: contacts[i].last_name,
            id: contacts[i].id,
          };
          const before = contacts.slice(0, i);
          const after = contacts.slice(i + 1);
          updatedContacts = before.concat(after);
          break;
        }
      }

      client.writeQuery({
        query: GET_CONTACTS,
        data: { getContacts: updatedContacts }, // Ensure data is structured correctly
      });

      setLocalStorageItem("contacts", updatedContacts);
      return deletedContact;
    },
  },
};

export default resolvers;
