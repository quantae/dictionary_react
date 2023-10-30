import React, { useContext } from 'react';
import dictionaryLogo from '../aserts/logo.svg';
import styles from './intro.module.css';
import { ThemeContext } from '../services/context/themeContext';

const Intro = () => {
    const {isDark} = useContext(ThemeContext)
  return (
    <div>
      <div className={` ${isDark ? styles.dark_card : styles.card}`}>
      <div className={styles.profile_img_container}>
        <img src={dictionaryLogo} alt='logo' className={styles.profile_img}/>
      </div>

      <div>
        <div className={`flex-space-between ${styles.user_summary}`}>
          <div className=''>
             <h1 className='text-dark'>Dictionary</h1>
             <p className='username'>designed by: <span className={styles.link}><a href='https://twitter.com/cssgerald?s=21' target='_blank' rel='noreferrer'> cssgerald</a></span></p>
             <p className={styles.description}>A portfolio project as part of frontend bootcamp curriculum using dictionaryapi.dev</p>
          </div>
          <h6 className='time_joined'>Oct 2023</h6>
          </div>
        <div>
          <div className={`flex-space-between ${styles.follower_history}`}>
            <img src='https://softr-prod.imgix.net/applications/f85a1484-7e05-4149-9d18-960420f69274/assets/1277f425-d2cd-4718-bb35-a7fb31148d88.png' alt='logo'/>
          </div>
          <div className={`${styles.links} ${styles.link}`}>
            <div>
              <p><i class="fa-solid fa-location-dot"></i> Accra, Ghana</p>
             <p> <i class="fa-solid fa-link"></i> <a href='https://www.azubiafrica.org/' target='_blank' rel="noreferrer">https://www.azubiafrica.org/</a></p>
            </div>
            <div> 
              <p><i class="fa-brands fa-x-twitter"></i> Not Available</p>
              <p><i class="fa-brands fa-linkedin"></i> <a href='https://www.linkedin.com/school/azubi-africa/' target='_blank' rel="noreferrer">azubi-africa</a></p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default Intro;
