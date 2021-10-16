import React, { useState } from 'react';
import ListItem from './components/ListItem'

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const mockTweets = [
      {name: "Redempto D. Legaspi III", tweet: "Tweet Tweet Tweet "}, 
      {name: "Rhyan Larosa", tweet: "Tweet Tweet Tweet 2"}, 
      {name: "John Paul Lopez", tweet: "Tweet Tweet Tweet 3"}, 
      {name: "Redempto D. Legaspi III", tweet: "Tweet Tweet Tweet"}, 
      {name: "Rhyan Larosa", tweet: "Tweet Tweet Tweet 2"}, 
      {name: "John Paul Lopez", tweet: "Tweet Tweet Tweet 3"}, 
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
    <div className = "h-2/5 w-full">
      <div className = "h-auto w-full bg-gray-100 p-1.5">
        <input type = "text" name = "searchBar" className = "mr-2 rounded-sm"/>
        <input type = "submit" name = "searchSubmit" value="Search"/>
      </div>
      <div className = "h-full overflow-y-scroll">
        {mockTweets.map(tweet => (<ListItem tweetData = {tweet}/>))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
