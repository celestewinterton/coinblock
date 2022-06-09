import React, { useState, useEffect } from "react";
import avatar from "../images/avatar.jpeg"
import LogoutButton from "../auth/LogoutButton"

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <img
        className="profile-button"
        style={{height: "40px", width: "40px", borderRadius: "25px", marginLeft: "10px"}}
        src={avatar} alt=""
        onClick={openMenu} />
      {showMenu && (
        <div className="profile-dropdown card">
          <img
            style={{height: "64px", width: "64px", borderRadius: "100%"}}
            src={avatar} alt=""
            onClick={openMenu}
          />
          <div>{user.firstName} {user.lastName}</div>
          <div className="muted1">{user.email}</div>
          <LogoutButton />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
