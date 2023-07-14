import { useEffect, useState } from 'react';
import styles from '../styles/Twitter.module.css';
import { useDispatch, useSelector } from 'react-redux'
import Tweet from './Tweet'
import Trends from './Trends'
import LastTweets from './LastTweets'
import FETCH_URL from '../config';

function Twitter() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)
  const [allTweets, setAllTweets] = useState([])

  useEffect(() => {
    fetch(`${FETCH_URL}/tweets/all`)
      .then(resp => resp.json())
      .then(data => {
        setAllTweets(data.allTweets)
      })
  }, [])

  return (
    <div className={styles.twitterContainer}>
      <div className={styles.tweetStyle}>
        <Tweet />
      </div>
      <div className={styles.lastTweetsStyle}>
        <LastTweets setAllTweets={setAllTweets} allTweets={allTweets} />
      </div>
      <div className={styles.trendsStyle}>
        <Trends setAllTweets={setAllTweets} allTweets={allTweets} />
      </div>
    </div>
  );
}

export default Twitter;