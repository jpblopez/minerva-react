import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import TweetDataContext from '../context/TweetDataContext';
import TweetController from '../controllers/TweetController';

const Dashboard = () => {
  const AppContext = useContext(TweetDataContext);
  const [yearTo, setYearTo] = useState(0);
  const clusterList = useRef([])

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Sentiments of the Tweets',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    TweetController.getSOMDetails().then((response) => {
      if (AppContext.cleanedTweetData.length === 0) return;

      AppContext.cleanedTweetData.forEach((tweet) => {
        const data = {}
        data.cluster = tweet.cluster
      })

      const currRow = response.data.size.row
      const currCol = response.data.size.col

      const positiveTweets = []
      const negativeTweets = []
      const neutralTweets = []
      AppContext.cleanedTweetData.forEach((tweet) => {
        if (tweet.overall_sentiment.sentiment === "positive") positiveTweets.push(tweet)
        if (tweet.overall_sentiment.sentiment === "negative") negativeTweets.push(tweet)
        if (tweet.overall_sentiment.sentiment === "neutral") neutralTweets.push(tweet)
      })

      for (let i = 0; i < currRow; i++) {
        for (let j = 0; j < currCol; j++) {
          const positiveRatio = (positiveTweets.length / AppContext.cleanedTweetData.length).toFixed(4) * 100
          const negativeRatio = (negativeTweets.length / AppContext.cleanedTweetData.length).toFixed(4) * 100
          const neutralRatio = (neutralTweets.length / AppContext.cleanedTweetData.length).toFixed(4) * 100
          
          clusterList.current.push(
            <div className="mb-4 flex flex-row justify-between items-center gap-8">
              <div className="w-1/2">{`Cluster [${i}][${j}]: `}</div>
              <div className="flex flex-row w-full">
                <div className="negative-bar" style={{
                  width: `${negativeRatio}%`
                }} />
                <div className="neutral-bar" style={{
                  width: `${neutralRatio}%`
                }} />
                <div className="positive-bar" style={{
                  width: `${positiveRatio}%`
                }} />
              </div>
            </div>
          )
        }
      }
    })
  }, [AppContext, clusterList]);
  const graphData = {
    positive: Array(12).fill(0),
    neutral: Array(12).fill(0),
    negative: Array(12).fill(0),
  };
  if (AppContext.loading) return <div className="p-4">Loading...</div>;
  for (const item of AppContext.tweetData) {
    const date = new Date(item.data.date);
    const year = date.getFullYear();
    // eslint-disable-next-line eqeqeq
    if (year == yearTo || yearTo == 0) {
      const month = date.getMonth();
      const { sentiment } = item.overall_sentiment;
      // if (!graphData[sentiment]) {
      //   graphData[sentiment] = Array(12).fill(0);
      // }

      graphData[sentiment][month] += 1;
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Positive',
        data: graphData.positive,
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Neutral',
        data: graphData.neutral,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Negative',
        data: graphData.negative,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  const piedata = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: '# of Sentiments',
        data: [
          graphData.positive.reduce((a, b) => a + b),
          graphData.neutral.reduce((a, b) => a + b),
          graphData.negative.reduce((a, b) => a + b),
        ],
        backgroundColor: [
          'rgb(53, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ],
        borderColor: [
          'rgb(53, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const DatabaseDetails = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="text-xl main-color mb-4">Database</div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Raw tweets</div>
        {(AppContext.tweetData == null && (
          <div className="font-satoshi">Loading...</div>
        )) || <div className="font-satoshi">{AppContext.tweetData.length}</div>}
      </div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Cleaned tweets</div>
        {(AppContext.cleanedTweetData == null && (
          <div className="font-satoshi">Loading...</div>
        )) || <div className="font-satoshi">{AppContext.cleanedTweetData.length}</div>}
      </div>
      <Link className="bg-greeny py-2 px-6 text-white" to="/tweets">
        View more
      </Link>
    </div>
  );

  const ScraperDetails = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="main-color text-lg flex flex-row justify-between items-baseline">
        <span>Scraper</span>
      </div>
      <div className="my-4">
        <div className="font-satoshi mb-1 text-faded">Last scraped on</div>
        <div className="font-satoshi">November 12, 2021</div>
      </div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Next scraped on</div>
        <div className="font-satoshi">November 19, 2021</div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="main-color text-2xl mb-4">Dashboard</h1>
      <select
        onChange={event => {
          setYearTo(event.target.value);
        }}
        value={yearTo}
      >
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="0">All Time</option>
      </select>
      <div className="flex flex-row gap-4">
        <div className="bg-white w-full p-4 flex-grow-1">
          <Bar data={data} options={options} />
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
        <div className="w-full h-full bg-white p-4">
          <div className="mb-4 main-color text-xl">Clusters</div>
          {
            clusterList.current.map((div)=> div)
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
