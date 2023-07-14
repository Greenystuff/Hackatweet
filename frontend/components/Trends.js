import styles from '../styles/Trends.module.css';

function Trends(props) {

  let allTrends = [];

  for (let i = 0; i < props.allTweets.length; i++) {
    if (props.allTweets[i].content.includes('#')) {
      allTrends.push("#" + props.allTweets[i].content.split('#')[1].split(' ')[0])
    }
  }

  const trend = [];
  const trendWords = []
  for (let i = 0; i < allTrends.length; i++) {
    let count = 0;
    for (let j = 0; j < allTrends.length; j++) {
      if (allTrends[i] === allTrends[j]) {
        count++;
      }
    }
    if (!trendWords.includes(allTrends[i])) {
      trendWords.push(allTrends[i]);
      trend.push(
        <div key={i} className={styles.trendContainer}>
          <h3 className={styles.trendTitle}>{allTrends[i]}</h3>
          <span className={styles.tweetNbr}>{count} tweets</span>
        </div>);
    }
  }

  return (
    <div>
      <h2 className={styles.title}>Trends</h2>
      <div className={styles.trendsContainer}>
        {trend}
      </div>
    </div>
  );
}

export default Trends;