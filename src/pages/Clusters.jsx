import React, { useContext, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import ReactWordCloud from 'react-wordcloud';
import TweetDataContext from '../context/TweetDataContext';
import TweetController from '../controllers/TweetController';

const Clusters = () => {
  const AppContext = useContext(TweetDataContext);
  const [positiveTweets, setPositiveTweets] = useState([]);
  const [neutralTweets, setNeutralTweets] = useState([]);
  const [negativeTweets, setNegativeTweets] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [words, setWords] = useState([]);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  const pageSize = 5
  const [page, setPage] = useState(1)

  const handlePagination = (increment) => {
    setPage(prevPage => {
      if (prevPage + increment < 1) return 1
      // if (prevPage + increment > totalPages) return totalPages
      return prevPage + increment
    })
  }

  useEffect(() => {
    setPositiveTweets(
      AppContext.tweetData.filter(
        tweet => tweet.overall_sentiment.sentiment === 'positive'
      )
    );
    setNeutralTweets(
      AppContext.tweetData.filter(
        tweet => tweet.overall_sentiment.sentiment === 'neutral'
      )
    );
    setNegativeTweets(
      AppContext.tweetData.filter(
        tweet => tweet.overall_sentiment.sentiment === 'negative'
      )
    );
  }, [AppContext]);

  useEffect(() => {
    TweetController.getClusterWords().then((response) => {
      const tempData = []
      if (typeof response.data[selectedCluster] === "undefined") {
        setWords([])
        return
      }
      Object.keys(response.data[selectedCluster]).forEach((key) => {
        tempData.push({
          text: key,
          value: response.data[selectedCluster][key]
        })
      })
      setWords(tempData)
    }
    )
  }, [selectedCluster])

  useEffect(() => {
    TweetController.getSOMDetails().then((response) => {
      const tempClusters = []
      setRow(response.data.size.row)
      setCol(response.data.size.col)
      for (let i = 0; i < response.data.size.row * response.data.size.col; i++) {
        tempClusters.push(i)
      }
      setClusterList(tempClusters)
    })
  }, [])

  const piedata = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          positiveTweets.length,
          negativeTweets.length,
          neutralTweets.length,
        ],
        backgroundColor: ['#4830de', '#BC3636', '#858585'],
        borderColor: ['#4830de', '#BC3636', '#858585'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="main-color text-2xl mb-4">Clusters</h1>
      <div className="flex flex-row gap-4">
        <div className="w-1/2 h-full bg-white p-4 flex flex-row gap-4">
          <div className="w-1/2 mx-auto">
            <Pie data={piedata} />
          </div>
          <div className="w-1/2 mx-auto">
            <table className="w-full h-full">
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Positive</td>
                <td className="py-3 px-2">
                  {(
                    (positiveTweets.length / AppContext.tweetData.length) *
                    100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Neutral</td>
                <td className="py-3 px-2">
                  {((neutralTweets.length / AppContext.tweetData.length) * 100).toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Negative</td>
                <td className="py-3 px-2">
                  {(
                    (negativeTweets.length / AppContext.tweetData.length) *
                    100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 font-satoshi">
          <div>
            <ReactWordCloud words={words} />
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-4 font-satoshi">
        <div className="main-color text-lg flex flex-row justify-start space-x-6 items-baseline">
          <span className="mb-4">Cluster</span>
          {
            clusterList.length !== 0 &&
            <select
              onChange={event => {
                setSelectedCluster(event.target.value);
              }}
              value={selectedCluster}
            >
              {
                clusterList.map((cluster, index) =>
                  <option value={index}>{index + 1}</option>
                )
              }
            </select>
          }
        </div>
        <table className="w-full">
          <thead className="main-color text-lg">
            <tr>
              <td className="px-2">Tweet ID</td>
              <td className="px-2">Tweet</td>
              {/* <td className="px-2">Date</td> */}
              <td className="px-2">Sentiment</td>
            </tr>
          </thead>
          <tbody>
            {
              AppContext.cleanedTweetData
                .filter((tweet) => tweet.cluster.row === Math.floor(selectedCluster / row) && tweet.cluster.col === selectedCluster % col)
                .map((tweet, index) => {
                  if (index < (page - 1) * pageSize || index >= page * pageSize) return <></>
                  return <tr className="hover:bg-gray-100 duration-200">
                    <td className="py-3 px-2">{tweet.tweet_id}</td>
                    <td className="py-3 px-2">{tweet.full_text}</td>
                    {/* <td className="py-3 px-2">Nov. 01, 2021</td>  */}
                    <td className="py-3 px-2">{tweet.overall_sentiment.sentiment}</td>
                  </tr>
                })
            }
          </tbody>
        </table>
        <div className='flex flex-row space-x-4'>
          <div className="space-x-1">
            <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow" onClick={() => { handlePagination(-1) }}>
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow" onClick={() => { handlePagination(1) }}>
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <span>Page: {page}</span>
        </div>
      </div>
    </div>
  );
};

export default Clusters;
