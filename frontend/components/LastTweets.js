import { useEffect, useState } from 'react';
import styles from '../styles/LastTweet.module.css';
import { useDispatch, useSelector } from 'react-redux'
import TweetMessage from './TweetMessage';
import { removeLikedTweet, addLikedTweet, setLikedTweet } from '../reducers/users'
import FETCH_URL from '../config'

function LastTweets() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const [charLength, setCharLenght] = useState(0)
  const [allTweets, setAllTweets] = useState([])
  const [newTweet, setNewTweet] = useState('')

  useEffect(() => {
    fetch(`${FETCH_URL}/tweets/all`)
      .then(resp => resp.json())
      .then(data => {
        setAllTweets(data.allTweets)
      })
    fetch(`${FETCH_URL}/users/myLikedTweets`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username: user.username
      })
    }).then(resp => resp.json())
      .then(data => {
        dispatch(setLikedTweet(data.liked))
      })
  }, [])

  const removeTweet = (tweetId) => {
    fetch(`${FETCH_URL}/tweets/removeTweet`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: tweetId
      })
    }).then(resp => resp.json())
      .then(data => {
        fetch(`${FETCH_URL}/tweets/all`)
          .then(resp => resp.json())
          .then(data => {
            setAllTweets(data.allTweets)
          })
      })
  }

  const tweetMessages = [];
  for (let i = 0; i < allTweets.length; i++) {
    let liked = false;
    let isOwner = false;
    if (user.likedTweets.includes(allTweets[i]._id)) {
      liked = true;
    }
    if (allTweets[i].user.username === user.username) {
      isOwner = true
    }
    tweetMessages.push(<TweetMessage removeTweet={removeTweet} id={allTweets[i]._id} date={allTweets[i].date} isOwner={isOwner} likeNumber={allTweets[i].likeNumber} content={allTweets[i].content} isLiked={liked} user={allTweets[i].user} key={i} />)
  }

  const sendTweet = () => {
    fetch(`${FETCH_URL}/tweets/new`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        content: newTweet
      })
    }).then(resp => resp.json())
      .then(data => {
        fetch(`${FETCH_URL}/tweets/all`)
          .then(resp => resp.json())
          .then(data => {
            setAllTweets(data.allTweets)
            setNewTweet('')
          })
      })
  }



  return (
    <div>
      <h2 className={styles.title}>Home</h2>
      <div className={styles.inputContainer}>
        <input value={newTweet} onChange={(e) => { setCharLenght(e.target.value.length); setNewTweet(e.target.value) }} maxLength={280} type='text' className={styles.tweetInput} placeholder="What's up?"></input>
      </div>
      <div className={styles.btnContainer}>
        <span className={styles.lengthTxt}>{charLength}/280</span>
        <button onClick={() => sendTweet()} className={styles.validateBtn}>Tweet</button>
      </div>
      {tweetMessages}
    </div>
  );
}

export default LastTweets;