import { useEffect, useState } from 'react';
import styles from '../styles/Trends.module.css';
import { useDispatch, useSelector } from 'react-redux'

function Trends() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value)

  return (
    <div>

    </div>
  );
}

export default Trends;