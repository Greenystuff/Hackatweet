import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Login from './Login'
import Twitter from './Twitter'
import { useDispatch, useSelector } from 'react-redux'


function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)



  let content = <Login key={0} />;
  if (user.token) {
    content = <Twitter key={0} />
  }

  return (
    <div>
      <main>
        {content}
      </main>
    </div>
  );
}

export default Home;
