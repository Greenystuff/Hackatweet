import { useEffect, useState } from 'react';
import styles from '../styles/LastTweet.module.css';
import { useDispatch, useSelector } from 'react-redux'
import TweetMessage from './TweetMessage';
import { removeLikedTweet, addLikedTweet, setLikedTweet } from '../reducers/users'

function LastTweets() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  const [charLength, setCharLenght] = useState(0)
  const [allTweets, setAllTweets] = useState([])
  const [newTweet, setNewTweet] = useState('')

  useEffect(() => {
    fetch('https://hackatweet-five.vercel.app/tweets/all')
      .then(resp => resp.json())
      .then(data => {
        setAllTweets(data.allTweets)
      })
    fetch('https://hackatweet-five.vercel.app/users/myLikedTweets')
      .then(resp => resp.json())
      .then(data => {
        dispatch(setLikedTweet(data.liked))
      })
  }, [])

  console.log('User liked tweets : ', user.likedTweets)

  const tweetMessages = [];
  for (let i = 0; i < allTweets.length; i++) {
    let liked = false;
    if (user.likedTweets.includes(allTweets[i]._id)) {
      liked = true;
    }
    console.log(`Tweet ${i} liké : `, liked)
    tweetMessages.push(<TweetMessage id={allTweets[i]._id} date={allTweets[i].date} likeNumber={allTweets[i].likeNumber} content={allTweets[i].content} isLiked={liked} user={allTweets[i].user} key={i} />)
  }

  console.log("Est ce que ça existe ? " + user._id)

  const sendTweet = () => {
    fetch('https://hackatweet-five.vercel.app/tweets/new', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user: user._id,
        content: newTweet
      }).then(resp => resp.json())
        .then(data => {
          fetch('https://hackatweet-five.vercel.app/tweets/all')
            .then(resp => resp.json())
            .then(data => {
              setAllTweets(data.allTweets)
            })
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