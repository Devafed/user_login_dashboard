import React from "react";
import "./header.css";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay-logout">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
