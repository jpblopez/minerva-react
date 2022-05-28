import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import TweetDataContext from '../context/TweetDataContext';

const Dashboard = () => {
  const AppContext = useContext(TweetDataContext);
  const [rawTweetData, setRawTweetData] = useState(AppContext.tweetData);
  const [cleanedTweetData, setCleanedTweetData] = useState(null);
  const [yearTo, setYearTo] = useState(0);

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
    setRawTweetData(AppContext.tweetData);
    setCleanedTweetData(AppContext.cleanedTweetData);
  }, [AppContext]);
  const graphData = {
    positive: Array(12).fill(0),
    neutral: Array(12).fill(0),
    negative: Array(12).fill(0),
  };
  if (AppContext.loading) return <div className="p-4">Loading...</div>;
  for (const item of rawTweetData) {
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
        {(rawTweetData == null && (
          <div className="font-satoshi">Loading...</div>
        )) || <div className="font-satoshi">{rawTweetData.length}</div>}
      </div>
      <div className="mb-4">
        <div className="font-satoshi mb-1 text-faded">Cleaned tweets</div>
        {(cleanedTweetData == null && (
          <div className="font-satoshi">Loading...</div>
        )) || <div className="font-satoshi">{cleanedTweetData.length}</div>}
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
