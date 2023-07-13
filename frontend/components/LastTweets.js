import { useEffect, useState } from 'react';
import styles from '../styles/LastTweet.module.css';
import { useDispatch, useSelector } from 'react-redux'

function LastTweets() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const [charLength, setCharlenght] = useState(0)

  return (
    <div className={styles.lastTweetsContainer}>
      <h2>Home</h2>
      <div className={styles.inputContainer}>
        <input onChange={(e) => setCharlenght(e.target.value.length)} maxLength={280} type='text' className={styles.tweetInput} placeholder="What's up?"></input>
      </div>
      <div className={styles.btnContainer}>
        <span className={styles.lengthTxt}>{charLength}/280</span>
        <button className={styles.validateBtn}>Tweet</button>
      </div>
    </div>
  );
}

export default LastTweets;