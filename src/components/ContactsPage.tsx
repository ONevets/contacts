/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import "../App.css";
import { css } from "@emotion/react";
import AddContactPage from "../components/AddContactPage";
import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT, UPDATE_CONTACT } from "../graphql/mutations";
import {
  GET_CONTACTS,
  GET_CONTACT_DETAIL,
} from "../graphql/queries";
import {
  FaMagnifyingGlass,
  FaRegStar,
  FaStar,
  FaTrash,
  FaArrowRightLong,
  FaArrowLeftLong,
} from "react-icons/fa6";
import DetailsPage from "../components/DetailsPage";

const body = css({
  textAlign: "center",
  backgroundColor: "#EBFFEF",
  fontFamily: "'Nunito Sans', sans-serif",
  height: "100vh",
});

const title = css({
  marginTop: "0px",
  paddingTop: "30px",
  letterSpacing: "1.5px",
});

const searchCSS = css({
  width: "70vw",
  height: "30px",
  border: "3px solid #4FD15A",
  padding: "5px",
  outline: "none",
  borderRadius: "5px",
});

const optionsContainer = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const contactContainer = css({
  letterSpacing: "0px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "5vh 5vw",
  padding: "2vh 2vw",
  justifyContent: "space-between",
  backgroundColor: "#D6FFDE",
  border: "3px solid #80EB93",
  borderRadius: "15px",
});

const searchBtn = css({
  margin: "15px 5px",
  cursor: "pointer",
  fontWeight: "500",
  padding: "15px 23px",
  borderRadius: "15px",
  fontSize: "0.8rem",
  border: "none",
  color: "white",
  background: "#4FD15A",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px -10px rgba(24, 90, 219, 0.6)",
  },
});

const primaryBtn = css({
  margin: "20px 18px",
  cursor: "pointer",
  fontWeight: "500",
  padding: "13px 23px",
  borderRadius: "15px",
  fontSize: "0.8rem",
  border: "none",
  color: "white",
  background: "#4FD15A",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px -10px rgba(24, 90, 219, 0.6)",
  },
});

const detailsBtn = css({
  textAlign: "center",
  margin: "20px 18px",
  cursor: "pointer",
  fontWeight: "500",
  padding: "13px 23px",
  borderRadius: "15px",
  fontSize: "0.8rem",
  border: "none",
  color: "white",
  background: "#4FD15A",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px -10px rgba(24, 90, 219, 0.6)",
  },
});

const contactOptionsContainer = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: "10px",
});

const paging = css({
  textAlign: "center",
  width: "100vw",
  height: "auto",
});

interface Contact {
  favorite: boolean;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: { number: string }[];
  id: number;
}

function ContactsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact>({
    favorite: false,
    created_at: "",
    first_name: "",
    last_name: "",
    phones: [],
    id: 0,
  });
  // const [search, setSearch] = useState("");
  // const [page, setPage] = useState(0);
  const { loading, data } = useQuery(GET_CONTACTS);
  const [loadContact] = useLazyQuery(GET_CONTACT_DETAIL);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [contacts, setContacts] = useState([]);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await deleteContact({
        variables: {
          id: id,
        },
      });

      // Handle the response, e.g., display a success message or update your UI.
      console.log("Contact deleted:", data.deleteContact);
    } catch (error: any) {
      // Handle errors, e.g., display an error message.
      console.error("Error deleting contact:", error.message);
    }
  };

  const handleFavorite = async (id: number, input: Contact) => {
    try {
      const newInput = {
        created_at: input.created_at,
        favorite: !input.favorite,
        first_name: input.first_name,
        last_name: input.last_name,
        phones: input.phones,
        id: input.id,
      };

      const { data } = await updateContact({
        variables: {
          id: id,
          input: newInput,
        },
      });

      // Handle the response, e.g., display a success message or update your UI.
      console.log("Contact updated:", data.updateContact);
    } catch (error: any) {
      // Handle errors, e.g., display an error message.
      console.error("Error updating contact:", error.message);
    }
  };

  const handleDetails = async (id: number) => {
    const variables = { variables: { id } };
    const { data } = await loadContact(variables);

    setSelectedContact(data.getContactDetail);

    setIsOpenDetails(true);
  };

  // const handleSearch = () => {
  //   console.log(search);
  // };

  useEffect(() => {
    if(data !== undefined){
      setContacts(data.getContacts);
    }
  }, [data]);

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <main>
        <div css={body}>
          <h1 css={title}>Contacts</h1>

          {/* <div>
            <input
              css={searchCSS}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
            />
            <button css={searchBtn} onClick={handleSearch} type="button">
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </button>
          </div> */}

          <div css={optionsContainer}>
            {/* <div>
              <button css={primaryBtn}>Filter by favorites</button>
            </div> */}

            <div>
              <button css={primaryBtn} onClick={() => setIsOpen(true)}>
                +
              </button>
              {isOpen && <AddContactPage setIsOpen={setIsOpen} />}
            </div>
          </div>

          <div css={{ textAlign: "left" }}>
            {contacts.map((value: Contact, key) => {
              let fullName = value.first_name + " " + value.last_name;
              let primaryPhoneNumber = value.phones[0].number;
              const maxStringName = 17;
              const maxStringPhone = 14;
              if (fullName.length >= maxStringName) {
                fullName = fullName.slice(0, maxStringName) + "...";
              }

              if (primaryPhoneNumber.length >= maxStringPhone) {
                primaryPhoneNumber =
                  primaryPhoneNumber.slice(0, maxStringPhone) + "...";
              }
              return (
                <div css={contactContainer} key={key}>
                  <div>
                    <h2>{fullName}</h2>
                    <p>Primary: {primaryPhoneNumber}</p>
                    <button
                      css={detailsBtn}
                      onClick={() => {
                        handleDetails(value.id);
                      }}
                    >
                      Details
                    </button>
                  </div>

                  <div css={contactOptionsContainer}>
                    <div
                      css={{
                        marginRight: "10px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleFavorite(value.id, value)}
                    >
                      {value.favorite ? (
                        <FaStar size={25} />
                      ) : (
                        <FaRegStar size={25} />
                      )}
                    </div>

                    <div
                      css={{ height: "25px", cursor: "pointer" }}
                      onClick={() => handleDelete(value.id)}
                    >
                      <FaTrash size={25} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isOpenDetails && (
            <DetailsPage
              setIsOpenDetails={setIsOpenDetails}
              details={selectedContact}
            />
          )}

          {/* <div css={paging}>
            <button
              css={primaryBtn}
              type="button"
              onClick={() => setPage(page - 1)}
            >
              <FaArrowLeftLong />
            </button>
            <button
              css={primaryBtn}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <FaArrowRightLong />
            </button>
          </div> */}
        </div>
      </main>
    );
  }
}

export default ContactsPage;
