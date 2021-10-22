import React, { useState, useEffect } from 'react'
import ListItem from './components/ListItem'
import TweetByDay from './components/TweetByDay'
import TweetByMonth from './components/TweetByMonth'
import TweetTotals from './components/TweetTotals'
import FlaskApi from '@/services/api'

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  // const [dateRange, setDateRange] = useState({dateFrom, dateTo})

  /* TODO: replace useState with api call */
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    FlaskApi.getDbData().then((response) => {
      const copy = response.data
      copy.forEach(item => {
        item.isVisible = true
      })
      // response.data.forEach(item => {
      //   item.isVisible = true
      // })
      setDbData(copy)
    })
  }, [])

  function searchTweets() {
    const dateFrom = Date.parse(document.querySelector("[name=dateFrom]").value)
    const dateTo = Date.parse(document.querySelector("[name=dateTo]").value)
    const copy = dbData.slice()
    const searchQuery = document.querySelector("[name=searchBar]").value
    let dateCreated;

    copy.forEach((tweet) => {
      dateCreated = Date.parse(tweet.created_at)
      if (dateFrom <= dateCreated && dateCreated <= dateTo && tweet.full_text.includes(searchQuery)) {
        tweet.isVisible = true
      }
      else {
        tweet.isVisible = false
      }
    })

    setDbData(copy)
  }


  const close = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000); // remove this later
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        {/* Tweet List */}
        <div className="w-full flex flex-col" style={{ height: '62.5vh' }}>
          <div className="h-auto w-full bg-gray-100 p-1.5 flex flex-row justify-between">
            {/* Date Range */}
            <div>
              <input type="date" name="dateFrom" defaultValue="2020-01-01" className="rounded-sm" onChange={(event) => searchTweets()} />
              <span className="ml-2 mr-2">to</span>
              <input type="date" name="dateTo" defaultValue={(new Date()).toISOString().slice(0, 10)} className="mr-2 rounded-sm" onChange={(event) => searchTweets()} />
            </div>
            {/* Search bar */}
            <div>
              <input type="text" name="searchBar" className="mr-2 rounded-sm" />
              <input type="submit" name="searchSubmit" className="bg-white rounded-sm p-0.5" value="Search" onClick={() => searchTweets()} />
            </div>
          </div>
          <div className="h-auto overflow-y-scroll">
            {dbData.map(tweet => (<ListItem tweetData={tweet} />))}
          </div>
        </div>

        {/* Stats */}
        <div className="block bg-white rounded-lg p-3 flex flex-col justify-between" style={{ height: '32.5vh' }}>
          <h1 className="text-gray-600 text-4xl">Statistics</h1>
          {/* Scrollable Widgets */}
          <div className="block flex flex-row justify-evenly" style={{ height: '25vh' }}>
            <div className="h-full p-2 bg-green-100 rounded-md inline-block" style={{ width: '25vw' }}>
              <TweetByDay dbData={dbData} />
            </div>
            <div className="h-full p-2 bg-yellow-100 rounded-md inline-block" style={{ width: '25vw' }}>
              <TweetByMonth dbData={dbData} />
            </div>
            <div className="h-full p-2 bg-red-100 rounded-md inline-block flex flex-row justify-around" style={{ width: '25vw' }}>
              <TweetTotals/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
