import { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TweetDataContext from '../context/TweetDataContext';

const Tweets = () => {
  const AppContext = useContext(TweetDataContext);
  const pageSize = 7;
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (typeof AppContext === 'undefined') setTweets([]);
    setTweets(AppContext.tweetData);
  }, [AppContext]);

  const filteredTweets = tweets.filter(val => {
    const tweetDate = new Date(val.data.date);
    if (val.data.full_text.toLowerCase().includes(searchTerm.toLowerCase())) {
      if (!dateFrom || !dateTo) return val;
      if (tweetDate >= dateFrom && tweetDate <= dateTo) {
        return val;
      }
      return false;
    }
    return false;
  });
  const totalPages = Math.ceil(filteredTweets.length / pageSize);

  const handlePagination = increment => {
    setPage(prevPage => {
      if (prevPage + increment < 1) return 1;
      if (prevPage + increment > totalPages) return totalPages;
      return prevPage + increment;
    });
  };

  return (
    <div className="p-4">
      <h1 className="main-color text-2xl mb-4">Tweets</h1>

      <div className="mb-4 flex flex-row justify-between w-full items-center">
        <div className="w-full">
          <input
            type="text"
            className="py-2 px-4 focus:outline-none w-full"
            placeholder="Enter keywords to search"
            onBlur={event => {
              setSearchTerm(event.target.value);
            }}
          />
          <div className="flex flex-row items-center justify-start mt-4 gap-4">
            <div>
              <span className="mr-4">From:</span>
              <input
                className="inline"
                type="date"
                onChange={event => {
                  setDateFrom(new Date(event.target.value));
                }}
              />
            </div>
            <div>
              <span className="mr-4">To:</span>
              <input
                className="inline"
                type="date"
                onChange={event => {
                  setDateTo(new Date(event.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {filteredTweets.length > pageSize && (
        <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex mb-2 ml-2">
          <span className="block">
            Page {page} of {totalPages}
          </span>
          <div className="space-x-1">
            <button
              title="previous"
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              onClick={() => {
                handlePagination(-1);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              title="next"
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              onClick={() => {
                handlePagination(1);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 font-satoshi">
        <table className="w-full table-fixed">
          <thead className="main-color text-lg">
            <tr>
              <td className="px-2">Tweet ID</td>
              <td className="px-2">Tweet</td>
              <td className="px-2">Date</td>
              <td className="px-2">Cluster</td>
              <td className="px-2">Sentiment</td>
            </tr>
          </thead>
          <tbody>
            {filteredTweets.map((tweet, index) => {
              if (index < (page - 1) * pageSize || index >= page * pageSize)
                return <></>;
              return (
                <tr
                  className="hover:bg-gray-100 duration-200"
                  key={tweet.tweet_id}
                >
                  <td className="py-3 px-2">{tweet.tweet_id}</td>
                  <td className="py-3 px-2">
                    <Link to={`/tweets/${tweet.tweet_id}`}>
                      {tweet.data.full_text}
                    </Link>
                  </td>
                  <td className="py-3 px-2" key={tweet.data.date}>
                    {tweet.data.date}
                  </td>
                  <td className="py-3 px-2">Accessibility</td>
                  <td
                    className="py-3 px-2"
                    key={tweet.overall_sentiment.sentiment}
                  >
                    {tweet.overall_sentiment.sentiment}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tweets;
