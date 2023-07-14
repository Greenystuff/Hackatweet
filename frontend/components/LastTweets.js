import { useEffect, useState } from 'react';
import styles from '../styles/LastTweet.module.css';
import { useDispatch, useSelector } from 'react-redux'
import TweetMessage from './TweetMessage';

function LastTweets() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const [charLength, setCharLenght] = useState(0)
  const [allTweets, setAllTweets] = useState([])
  const [newTweet, setNewTweet] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/tweets/all')
      .then(resp => resp.json())
      .then(data => {
        setAllTweets(data.allTweets)
        console.log(data.allTweets)
      })
  }, [])

  const tweetMessages = [];
  for (let i = 0; i < allTweets.length; i++) {
    tweetMessages.push(<TweetMessage id={allTweets[i]._id} date={allTweets[i].date} content={allTweets[i].content} isLiked={allTweets[i].isLiked} user={allTweets[i].user} key={i} />)
  }

  return (
    <div>
      <h2 className={styles.title}>Home</h2>
      <div className={styles.inputContainer}>
        <input value={newTweet} onChange={(e) => { setCharLenght(e.target.value.length); setNewTweet(e.target.value) }} maxLength={280} type='text' className={styles.tweetInput} placeholder="What's up?"></input>
      </div>
      <div className={styles.btnContainer}>
        <span className={styles.lengthTxt}>{charLength}/280</span>
        <button className={styles.validateBtn}>Tweet</button>
      </div>
      {tweetMessages}
    </div>
  );
}

export default LastTweets;