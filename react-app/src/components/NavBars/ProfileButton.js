import React, { useState, useEffect } from "react";
import avatar from "../images/avatar.jpeg"
import LogoutButton from "../auth/LogoutButton"
import { ProfileModal } from "../../context/Modal"


function ProfileButton({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        className="profile-button"
        style={{height: "40px", width: "40px", borderRadius: "25px", marginLeft: "10px"}}
        src={avatar} alt=""
        onClick={() => setShowModal(true)} />
      {showModal && (
        <ProfileModal onClose={() => setShowModal(false)}>
          <img
            style={{height: "64px", width: "64px", borderRadius: "100%", marginBottom: "10px"}}
            src={avatar} alt=""
          />
          <div className="top-margin">{user.firstName} {user.lastName}</div>
          <div className="muted1 top-margin">{user.email}</div>
          <LogoutButton />
        </ProfileModal>
      )}
    </>
  );
}

export default ProfileButton;
