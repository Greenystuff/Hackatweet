import styles from '../styles/Login.module.css';
import Image from 'next/image';
import ModalPopup from './Modal';

import { useEffect, useState } from 'react';

function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setLoginOrSignin = (action) => {
    if (action === "signin") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
    openModal()
  }

  return (
    <div className={styles.globalContainer}>
      <div className={styles.main}>
        <Image src='/images/logo_twitter.png' width={200} height={170} alt='Logo Twitter'></Image>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <Image src='/images/logo_twitter.png' width={40} height={30} alt='Logo Twitter'></Image>
          <span className={styles.loginTitle}>See what's happening</span>
          <span className={styles.classicText}>Join hackatweet today.</span>
          <button onClick={() => setLoginOrSignin('signin')} className={styles.signUpBtn}>Sign up</button>
          <ModalPopup isSignUp={isSignUp} closeModal={closeModal} modalIsOpen={modalIsOpen} ></ModalPopup>
          <span className={styles.littleText}>Already have an account?</span>
          <button onClick={() => setLoginOrSignin('login')} className={styles.signInBtn}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;