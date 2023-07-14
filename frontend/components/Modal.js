import { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { addUserToStore } from '../reducers/users'
import Modal from 'react-modal';
import Image from 'next/image';
import FETCH_URL from '../config';

function ModalPopup(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorTxt, setErrorTxt] = useState('');

  let btnTxt = 'Sign up';
  if (props.isSignUp) {

  } else {
    btnTxt = 'Login'
  }

  const resetModal = () => {
    props.closeModal();
    setFirstname('');
    setUsername('');
    setPassword('')

  }

  const btnClicked = () => {
    if (props.isSignUp) {
      fetch(`${FETCH_URL}/users/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstname,
          username,
          password
        })
      }).then(resp => resp.json())
        .then(data => {
          if (data.result) {
            dispatch(addUserToStore(data))
            setFirstname('');
            setUsername('');
            setPassword('')
            props.closeModal();
          } else {
            setErrorTxt(data.error);
          }

        })
    } else {
      btnTxt = 'Login'
      fetch(`${FETCH_URL}/users/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.result) {
            dispatch(addUserToStore(data))
            setFirstname('');
            setUsername('');
            setPassword('')
            props.closeModal();
          } else {
            setErrorTxt(data.error);
          }
        })
    }
  }

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={resetModal}
        className={styles.modalContainer}
        contentLabel="log Modal"
      >
        <div className={styles.closeBtnContainer}>
          <span className={styles.closeBtn} onClick={() => resetModal()}>X</span>
        </div>
        <Image src='/images/logo_twitter.png' width={40} height={30} alt='Logo Twitter'></Image>
        {props.isSignUp ? <h2 className={styles.title}>Create your Hackatweet account</h2> : <h2 className={styles.title}>Login to your Hackatweet account</h2>}

        <div className={styles.form}>
          {props.isSignUp ? <input value={firstname} onChange={(e) => { setFirstname(e.target.value); setErrorTxt('') }} className={styles.signUpInput} placeholder='Firstname' /> : <></>}
          <input value={username} onChange={(e) => { setUsername(e.target.value); setErrorTxt('') }} className={styles.signUpInput} placeholder='Username' />
          <input type='password' value={password} onChange={(e) => { setPassword(e.target.value); setErrorTxt('') }} className={styles.signUpInput} placeholder='Password' />
          <button onClick={() => btnClicked()} className={styles.validateBtn}>{btnTxt}</button>
          <span className={styles.errorTxt}>{errorTxt}</span>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPopup;