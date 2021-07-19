import React from "react";
import "../styles/modal.css";

const Modal = ({ children, active }) => {
  return (
    <div className={`modal-wrap ${active ? "active" : ""}`}>
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
