import { useEffect, useState } from 'react';
import styles from '../styles/Tweet.module.css';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { deleteUser } from '../reducers/users'

function Tweet() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const logoutClicked = () => {
    dispatch(deleteUser());
  }

  return (
    <div className={styles.tweetContainer}>
      <Image src='/images/logo_twitter.png' width={40} height={30} alt='Logo Twitter'></Image>
      <div className={styles.logoutDiv}>
        <Image src='/images/avatar.png' width={40} height={40} alt='Avatar'></Image>
        <div className={styles.idLogout}>
          <span>{user.username}</span>
          <span onClick={() => logoutClicked()} className={styles.logoutBtn}>Logout</span>
        </div>
      </div>

    </div>
  );
}

export default Tweet;