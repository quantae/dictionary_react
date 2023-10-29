import styles from './toggle-switch.module.css'



const ToggleSwitch = ({checked, onChange}) => {

  return (
  
      <label htmlFor='check' className={styles.toggle_switch}>
        <input type='checkbox'className={styles.check_input} id='check' checked={checked} onChange={onChange}/>
        <span className={styles.slider}></span>
      </label>
    
  );
}

export default ToggleSwitch;
