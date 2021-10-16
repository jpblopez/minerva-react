import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem'
import FlaskApi from '@/services/api'

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  /* TODO: replace useState with api call */
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    FlaskApi.getDbData().then((response) => {
      setDbData(response.data)
      console.log(response.data)
    })
  }, [])


  const close = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000); // remove this later
  };

  return (
    <>
      <div className="w-full" style = {{height: '40vh'}}>
        <div className="h-auto w-full bg-gray-100 p-1.5">
          <input type="text" name="searchBar" className="mr-2 rounded-sm" />
          <input type="submit" name="searchSubmit" value="Search" />
        </div>
        <div className="h-full overflow-y-scroll">
          {dbData.map(tweet => (<ListItem tweetData={tweet} />))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
