import React, { useContext, useEffect } from "react";
import dictionarylogo from "../aserts/logo.svg";
import moonIconLight from '../aserts/icon-moon.svg'
import moonIconDark from '../aserts/icon-moon-dark.svg'
import ToggleSwitch from "./ToggleSwitch";
import { FontContext } from "../services/context/FontContext";
import { ThemeContext } from "../services/context/themeContext";
import style from './topbar.module.css'
import Dropdown from "./Dropdown";

export const Logo = () => (
  <div>
    <img src={dictionarylogo} alt="dictionary logo" style={{width: '1.5rem'}}/>
  </div>
);

export const FontSelect = () => {

const {selectedFont, setSelectedFont} = useContext(FontContext)
const FONT_LIST = ['sans serif', 'serif', 'mono']

const handleFontSelect = (value) => {
  setSelectedFont(value)
}

useEffect(() => {
  console.log('font:', selectedFont);
}, [selectedFont]);

    return (
        <div className={`flex ${style.custom_select}`}>
          <Dropdown
          listItems={FONT_LIST}
          selectedValue={selectedFont}
          onClick={handleFontSelect}/>
            {/**
             *  <select value={selectedFont} onChange={handleFontSelect}>
                <option value="sans_serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Mono</option>
            </select>
            <span class="custom_arrow"><CarretDown/></span>
             */}
           
        </div>
    )
}

export const ThemeToggle = () => {
  // const theme = useTheme();
  const {isDark, setIsDark} = useContext(ThemeContext)
  const handleToggleSwitch = () => {
    setIsDark((prev) => !prev)
  }
  useEffect(() => {

    console.log('is dark: ', isDark)
  }, [isDark])
 
    return (
        <div className="flex-gap">
            <ToggleSwitch onChange={handleToggleSwitch} checked={isDark} />
            {isDark ? (
              <img src={moonIconDark} alt="moon icon" style={{height: '1.2rem'}}/>
            ) : (
              <img src={moonIconLight} alt="moon icon" style={{height: '1.2rem'}}/>
            )}
        </div>
    )
}

const TopBar = () => {
  return (
    <div className="flex-space-between">
      <Logo />
      <div className="flex-gap align-center">
        <FontSelect />
        <ThemeToggle/>
      </div>
    </div>
  );
};

export default TopBar;
