/** @jsxImportSource @emotion/react */
"use client";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../graphql/mutations";
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  color: "black",
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

interface Contact {
  favorite: boolean;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: { number: string }[];
  id: number;
}

export default function DetailsPage({
  setIsOpenDetails,
  details,
}: {
  setIsOpenDetails: Dispatch<SetStateAction<boolean>>;
  details: Contact;
}) {
  useEffect(() => {
    console.log(details);
    console.log(typeof details);
  }, []);

  return (
    <main>
      <div css={{ letterSpacing: "0px" }}>
        <div css={darkBG} onClick={() => setIsOpenDetails(false)} />
        <div css={centered}>
          <div css={modal}>
            <div css={modalHeader}>
              <h2 css={heading}>Details</h2>
            </div>
            <div css={modalContent}>
              <h3>Full name</h3>
              <p>
                {details.first_name} {details.last_name}
              </p>
              <h3>Phones</h3>
              {details.phones.map((value) => {
                return(
                  <p>{value.number}</p>
                )
              })}
            </div>
            <div css={modalActions}>
              <div css={actionsContainer}>
                <button css={cancelBtn} onClick={() => setIsOpenDetails(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
