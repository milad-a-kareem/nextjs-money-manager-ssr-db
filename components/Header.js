import React from "react";
import Logo from "./Logo";
import AddButton from "./AddButton";

import AddCostModal from "../modals/AddCostModal";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

function Header() {
  const isModalOpen = useSelector((state) => state.showForm.isOpen);
  const headerClasses = `
  flex 
  justify-between 
  items-center 
  bg-primary 
  w-full 
  h-20 
  px-5 
  fixed 
  left-0 
  top-0 
  lg:px-20
    `;
  return (
    <div className={headerClasses}>
      <Logo />
      <AddButton />
      {isModalOpen &&
        ReactDOM.createPortal(
          <AddCostModal />,
          document.getElementById("modal")
        )}
    </div>
  );
}

export default Header;
