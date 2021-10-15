import React, { useState } from 'react';
import ListItem from './components/ListItem'

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const mockTweets = [
      {name: "Redempto D. Legaspi III", tweet: "Tweet Tweet Tweet"}, 
      {name: "Rhyan Larosa", tweet: "Tweet Tweet Tweet 2"}, 
      {name: "John Paul Lopez", tweet: "Tweet Tweet Tweet 3"}, 
  ]

  const close = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000); // remove this later
  };

  return (
    <>
    <div className = "overflow-y-scroll h-1/4 w-2/5">
      {mockTweets.map(tweet => (<ListItem tweetData = {tweet}/>))}
    </div>
    </>
  );
};

export default Dashboard;
