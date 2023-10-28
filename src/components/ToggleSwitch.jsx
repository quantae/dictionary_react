import React, { useContext } from 'react';
import style from './toggle-switch.module.css'



const ToggleSwitch = ({checked, onChange}) => {

  return (
  
      <label htmlFor='check' className={style.toggle_switch}>
        <input type='checkbox' id='check' checked={checked} onChange={onChange}/>
        <span className={style.slider}></span>
      </label>
    
  );
}

export default ToggleSwitch;
