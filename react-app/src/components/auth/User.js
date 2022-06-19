import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactions } from '../../store/transactions'
import { useDispatch } from 'react-redux';


function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const transactions = user.transactions;

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  // console.log("User Transactions ===> ", transactions)

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>First Name</strong> {user.firstName}
        </li>
        <li>
          <strong>Last Name</strong> {user.lastName}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      {/* <ul>{transactions.map(txn => <li key={txn.id}>{txn.amount}</li>)}</ul> */}
    </>
  );
}
export default User;
