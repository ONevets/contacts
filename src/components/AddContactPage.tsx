/** @jsxImportSource @emotion/react */
"use client";
import "../App.css";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../graphql/mutations";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const darkBG = css({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: "100vw",
  height: "100vh",
  zIndex: "0",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "fixed",
});

const centered = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const modal = css({
  width: "80vw",
  height: "80vh",
  background: "#EBFFEF",
  color: "white",
  zIndex: "10",
  borderRadius: "16px",
  boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
});

const modalHeader = css({
  height: "50px",
  background: "#EBFFEF",
  overflow: "hidden",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
});

const heading = css({
  margin: "0",
  padding: "10px",
  color: "#2c3e50",
  fontWeight: "28px",
  fontSize: "21px",
  textAlign: "center",
});

const modalContent = css({
  padding: "10px",
  fontSize: "14px",
  color: "#2c3e50",
  textAlign: "center",
  overflow: "scroll",
  height: "65vh",
  overflowX: "hidden",
});

const modalActions = css({
  position: "absolute",
  bottom: "2px",
  marginBottom: "10px",
  width: "100%",
});

const actionsContainer = css({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const cancelBtn = css({
  marginTop: "10px",
  cursor: "pointer",
  fontWeight: "500",
  padding: "11px 28px",
  borderRadius: "12px",
  fontSize: "0.8rem",
  border: "none",
  color: "#fff",
  background: "#ff3e4e",
  transition: "all 0.25s ease",
  "&:hover": {
    boxShadow: "0 10px 20px -10px rgba(255, 62, 78, 0.6)",
    transform: "translateY(-5px)",
    background: "#ff3e4e",
  },
});

const addBtn = css({
  marginTop: "10px",
  cursor: "pointer",
  fontWeight: "500",
  padding: "11px 28px",
  borderRadius: "12px",
  fontSize: "0.8rem",
  border: "none",
  color: "white",
  background: "#4FD15A",
  transition: "all 0.25s ease",
  "&:hover": {
    boxShadow: "none",
    transform: "none",
    background: "whitesmoke",
  },
});

const inputCSS = css({
  width: "70vw",
  height: "30px",
  border: "3px solid #4FD15A",
  padding: "5px",
  outline: "none",
  borderRadius: "5px",
});

const labelCSS = css({
  display: "inline-block",
  marginBottom: "10px",
  marginTop: "10px",
  fontSize: "16px",
});

type Open = {
  setIsOpen(isOpen: boolean): void;
};

export default function AddContactPage({ setIsOpen }: Open) {
  const [length, setLength] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>([]);
  const [phoneNumberInput, setPhoneNumberInput] = useState<any>([]);
  const [createContact] = useMutation(CREATE_CONTACT);

  const handleCreateContact = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const contactData = {
      created_at: currentDate.toString(),
      favorite: false,
      first_name: firstName,
      last_name: lastName,
      phones: phoneNumber,
    };

    try {
      const { data } = await createContact({
        variables: {
          input: contactData,
        },
      });

      setIsOpen(false);
      // Handle the response, e.g., display a success message or update your UI.
      console.log("Contact created:", data.createContact);
    } catch (error: any) {
      // Handle errors, e.g., display an error message.
      console.error("Error creating contact:", error.message);
    }
  };

  useEffect(() => {
    const newNumberElement = (
      <div key={length}>
        <label css={labelCSS} htmlFor={`phoneNumber${length}`}>
          Phone Number {length}
        </label>
        <br />
        <input
          css={inputCSS}
          type="string"
          name={`phoneNumber${length}`}
          id={`phoneNumber${length}`}
          onChange={(e) => {
            const newNumber = { number: e.target.value };
            let newArr = [...phoneNumber];
            newArr[length - 1] = newNumber;
            setPhoneNumber(newArr);
          }}
          required
        />
        <br />
      </div>
    );

    setPhoneNumberInput([...phoneNumberInput, newNumberElement]);
  }, [length]);

  return (
    <main>
      <div css={{ letterSpacing: "0px" }}>
        <div css={darkBG} onClick={() => setIsOpen(false)} />
        <div css={centered}>
          <div css={modal}>
            <form
              method="post"
              onSubmit={(e) => {
                handleCreateContact(e);
              }}
            >
              <div css={modalHeader}>
                <h2 css={heading}>Add Contact</h2>
              </div>
              <div css={modalContent}>
                <label css={labelCSS} htmlFor="firstName">
                  First Name
                </label>
                <br />
                <input
                  css={inputCSS}
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <br />
                <label css={labelCSS} htmlFor="lastName">
                  Last Name
                </label>
                <br />
                <input
                  css={inputCSS}
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <br />
                <div>{phoneNumberInput}</div>
                <div
                  css={addBtn}
                  onClick={() => {
                    setLength(length + 1);
                  }}
                >
                  <FaPlus />
                </div>
                <br />
              </div>
              <div css={modalActions}>
                <div css={actionsContainer}>
                  <button type="submit" css={addBtn}>
                    Add
                  </button>
                  <button css={cancelBtn} onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
