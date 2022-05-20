import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import TweetDataContext from '../context/TweetDataContext';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Positive',
      data: [1, 2, 1, 1, 2, 2],
      backgroundColor: '#4830de',
      borderColor: '#4830de',
      yAxisID: 'y-axis-1',
    },
    {
      label: '# of Negative',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#BC3636',
      borderColor: '#BC3636',
      yAxisID: 'y-axis-2',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
      },
    ],
  },
};

const Dashboard = () => {
  const AppContext = useContext(TweetDataContext)
  const [positiveTweets, setPositiveTweets] = useState([])
  const [neutralTweets, setNeutralTweets] = useState([])
  const [negativeTweets, setNegativeTweets] = useState([])
  const [rawTweetData, setRawTweetData] = useState(null);
  const [cleanedTweetData, setCleanedTweetData] = useState(null);

  const piedata = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: '# of Votes',
        data: [positiveTweets.length, negativeTweets.length, neutralTweets.length],
        backgroundColor: ['#4830de', '#BC3636', '#858585'],
        borderColor: ['#4830de', '#BC3636', '#858585'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const getTweets = setTimeout(() => {
      setRawTweetData(AppContext)
      setPositiveTweets(AppContext.filter((tweet)=>tweet.sentiment === "Positive"))
      setNeutralTweets(AppContext.filter((tweet)=>tweet.sentiment === "Neutral"))
      setNegativeTweets(AppContext.filter((tweet)=>tweet.sentiment === "Negative"))
      setCleanedTweetData([])
    }, 1000)

    return () =>
      clearTimeout(getTweets)
  }, [AppContext])

  const DatabaseDetails = () => 
    <div className="w-full h-full bg-white p-4">
      <div className="text-xl main-color mb-4">Database</div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Raw tweets</div>
        {
          (
            rawTweetData == null &&
            <div className="font-satoshi">Loading...</div>
          ) ||
          <div className="font-satoshi">{rawTweetData.length}</div>
        }
      </div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Cleaned tweets</div>
        {
          (
            cleanedTweetData == null &&
            <div className="font-satoshi">Loading...</div>
          ) ||
          <div className="font-satoshi">{cleanedTweetData.length}</div>
        }
      </div>
      <Link className="bg-greeny py-2 px-6 text-white" to="/tweets">
          View more
      </Link>
    </div>

  const ScraperDetails = () =>
    <div className="w-full h-full bg-white p-4">
      <div className="main-color text-lg flex flex-row justify-between items-baseline">
        <span>Scraper</span>
        <span className="text-sm text-faded font-satoshi">Settings</span>
      </div>
      <div className="my-4">
        <div className="font-satoshi mb-1 text-faded">
          Last scraped on
        </div>
        <div className="font-satoshi">November 12, 2021</div>
      </div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">
          Next scraped on
        </div>
        <div className="font-satoshi">November 19, 2021</div>
      </div>
      <button className="bg-greeny py-2 px-6 text-white" type="button">
        Scrape now
      </button>
    </div>

  return (
    <div className="p-4">
      <h1 className="main-color text-2xl mb-4">Dashboard</h1>
      <div className="flex flex-row gap-4">
        <div className="bg-white w-full p-4 flex-grow-1">
          <Line data={data} options={options} />
        </div>
        <div className="w-1/4 flex flex-col gap-4">
          <ScraperDetails />
          <DatabaseDetails />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-between mt-4">
        <div className="w-full h-full bg-white p-4">
          <div className="mb-6 main-color text-xl text-center">
            Sentiment of all Tweets
          </div>
          <div className="w-2/3 mx-auto">
            <Pie data={piedata} />
          </div>
        </div>
        <div className="w-full h-full bg-white p-4">This is a test</div>
        <div className="w-full h-full bg-white p-4">
          <div className="mb-4 main-color text-xl">Clusters</div>
          <div className="mb-4 flex flex-row justify-between items-center gap-8">
            <div className="w-1/2">Accessibility</div>
            <div className="flex flex-row w-full">
              <div className="negative-bar w-2/12" />
              <div className="neutral-bar w-6/12" />
              <div className="positive-bar w-4/12" />
            </div>
          </div>
          <div className="mb-4 flex flex-row justify-between items-center gap-8">
            <div className="w-1/2">Quality of Delivery</div>
            <div className="flex flex-row w-full">
              <div className="negative-bar w-2/12" />
              <div className="neutral-bar w-6/12" />
              <div className="positive-bar w-4/12" />
            </div>
          </div>
          <div className="mb-4 flex flex-row justify-between items-center gap-8">
            <div className="w-1/2">Content Quality</div>
            <div className="flex flex-row w-full">
              <div className="negative-bar w-2/12" />
              <div className="neutral-bar w-6/12" />
              <div className="positive-bar w-4/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
