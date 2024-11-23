import React from "react";
import { FC } from "react";
import "./modal.css";

interface ComponentProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Modal: FC<ComponentProps> = ({ active, setActive }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default Modal;
