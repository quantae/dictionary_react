import React, { useContext, useRef, useState } from "react";
import { ReactComponent as CarretDown } from "../aserts/carretDown.svg";
import { ReactComponent as CarretUp } from "../aserts/carretUp.svg";
import ClickOutSide from "./clickOut/ClickOutSide";
import style from "./dropdown.module.css";
import { ThemeContext } from "../services/context/themeContext";

const Dropdown = ({ listItems, selectedValue, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const exceptionRef = useRef();
  const {isDark} = useContext(ThemeContext)

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleValueClickEvent = (value) => {
    setIsOpen(false);
    onClick(value);
  };

  
  return (
    <div className={`${isDark ? 'dark_theme' : 'light_theme'} ${style.dropdown_container} `}>
      <div
        tabIndex={-1}
        className={style.dropdown_header}
        onClick={toggleDropDown}
        ref={exceptionRef}
      >
        <div className={style.selected_value}><h5>{selectedValue}</h5></div>
        <div>{isOpen ? <CarretUp /> : <CarretDown />}</div>
      </div>
      <div className={`${style.dropdown_list_container} ${isDark ? style.dark_dropdown_list_container : ''}`}>
        {isOpen && (
          <ClickOutSide
            className
            onClick={() => setIsOpen(false)}
            exceptionRef={exceptionRef}
          >
            <ul
              className={style.dropdown_list}
              tabIndex={-1}
            >
              {listItems.map((item, index) => (
                <li
                  className="dropdown-list-item"
                  key={`dropdown-list-${index}`}
                  onClick={() => handleValueClickEvent(item)}
                  value={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </ClickOutSide>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
