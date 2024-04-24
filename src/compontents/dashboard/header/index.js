import React, { useState } from "react";
import Logout from "../../assets/logout-icons.png";
import CloseIcons from "../../assets/close-icon.png";
import "../style.css";
import "./header.css";
import Modal from "./modal.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setShowLogout(false);
  };
  const handleClick = () => setShowLogout(!showLogout);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
  };

  return (
    <div className="admin__header">
      <div className="profile-header" onClick={handleClick}>
        <span>S</span>
      </div>
      <div
        onClick={handleOpen}
        className={`logout-menu ${showLogout ? "show" : ""}`}
      >
        <img src={Logout} alt="logout" />
        <p>Logout</p>
      </div>
      <Modal isOpen={open}>
        <div className="modal-header">
          <h2>Logout</h2>
          <img src={CloseIcons} onClick={handleClose} alt="vector" />
        </div>
        <div className="modal-text">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="logout-btn" onClick={logOut}>
            <img src={Logout} alt="logout" />
            <p>Logout</p>
          </button>
        </div>
      </Modal>
    </div>
  );
}
