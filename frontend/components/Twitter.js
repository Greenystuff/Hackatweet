import { useEffect, useState } from 'react';
import styles from '../styles/Twitter.module.css';
import { useDispatch, useSelector } from 'react-redux'
import Tweet from './Tweet'
import Trends from './Trends'
import LastTweets from './LastTweets'

function Twitter() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  return (
    <div className={styles.twitterContainer}>
      <div className={styles.tweetStyle}>
        <Tweet />
      </div>
      <div className={styles.lastTweetsStyle}>
        <LastTweets />
      </div>
      <div className={styles.trendsStyle}>
        <Trends />
      </div>
    </div>
  );
}

export default Twitter;