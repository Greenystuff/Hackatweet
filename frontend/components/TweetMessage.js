import { useEffect, useState } from 'react';
import styles from '../styles/TweetMessage.module.css';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TweetMessage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  let delai;
  let dateDuTweet = new Date(props.date).getTime();
  let dateMaintenant = new Date().getTime();

  delai = dateMaintenant - dateDuTweet;
  delai = new Date(delai)
  delai = delai.toISOString().split('T')[1].split(':')[0]



  return (
    <div className={styles.tweetContainer}>
      <div className={styles.userContainer}>
        <div className={styles.userAvatar}>
          <Image src='/images/avatar.png' width={40} height={40} alt='Avatar'></Image>
        </div>
        <span className={styles.firstName}>{props.user.firstname}</span>
        <span className={styles.userName}>@{props.user.username}</span>
        <span></span>
        <span className={styles.userName}> -  {Number(delai)} hours</span>
      </div>
      <div className={styles.contentContainer}>
        <span>{props.content}</span>
      </div>
      <div className={styles.iconsContainer}>
        <div className={styles.likesContainer}>
          <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff", }} />
          <span>1</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", }} />
        </div>
      </div>
    </div>
  );
}

export default TweetMessage;