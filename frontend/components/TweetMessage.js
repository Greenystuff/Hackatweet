import { useEffect, useState } from 'react';
import styles from '../styles/TweetMessage.module.css';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { removeLikedTweet, addLikedTweet } from '../reducers/users'
import FETCH_URL from '../config';

function TweetMessage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const [isLiked, setIsLiked] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    setIsLiked(props.isLiked)
    setLikeNumber(props.likeNumber)

  }, [])

  let delai;
  let dateDuTweet = new Date(props.date).getTime();
  let dateMaintenant = new Date().getTime();

  delai = dateMaintenant - dateDuTweet;
  delai = new Date(delai)
  delai = delai.toISOString().split('T')[1].split(':')[0]

  let customStyle = { color: "#ffffff" }
  const likeClicked = () => {
    setIsLiked(!isLiked)
    fetch(`${FETCH_URL}/tweets/like`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: props.id,
        username: user.username,
        isLiked: !isLiked
      })
    }).then(resp => resp.json())
      .then(data => console.log('Fetch tweet liked : ', data.result))
    if (isLiked) {
      dispatch(removeLikedTweet(props.id))
      setLikeNumber(likeNumber - 1)
    } else {
      dispatch(addLikedTweet(props.id))
      setLikeNumber(likeNumber + 1)
    }
  }

  if (isLiked) {
    customStyle = { color: "red" }
    props.likeNumber + 1
  } else {
    props.likeNumber - 1
  }
  const trash = props.isOwner ? <div className={styles.trashContainer}>
    <FontAwesomeIcon onClick={() => props.removeTweet(props.id)} icon={faTrashCan} style={{ color: "#ffffff", }} />
  </div> : <></>

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
          <FontAwesomeIcon onClick={() => likeClicked()} icon={faHeart} style={customStyle} />
          <span>{likeNumber}</span>
        </div>
        {trash}
      </div>
    </div>
  );
}

export default TweetMessage;