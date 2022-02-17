import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import TweetController from '@/controllers/TweetController';

const Tweets = () => {
  const [tweets, setTweets] = useState([])
  useEffect(() => {
    TweetController.getAll().then((response) => {
      setTweets(response.data.slice(0,10))
    });
  }, [])

  return (
    <div className="p-4">
      <h1 className="main-color text-2xl mb-4">Tweets</h1>

      <div className="mb-4 flex flex-row justify-between w-full items-center">
        <div className="flex flex-row gap-8 w-3/5 font-satoshi">
          <div className="flex-grow-1 flex">
            <span className="block mr-4">Date</span>
            <div>
              <span className="text-faded mr-4">10-01-2021</span>
              <span className="text-faded">11-01-2021</span>
            </div>
          </div>
          <div className="flex-grow-1 flex">
            <span className="block mr-4">Cluster</span>
            <span className="text-faded">Accessibility</span>
          </div>
          <div className="flex-grow-1 flex">
            <span className="block mr-4">Sentiment</span>
            <span className="text-faded">Positive</span>
          </div>
        </div>

        <div className="w-1/5">
          <input
            type="text"
            className="py-2 px-4 focus:outline-none w-full"
            placeholder="Enter keywords to search"
          />
        </div>
      </div>

      <div className="bg-white p-4 font-satoshi">
        <table className="w-full">
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
            {
              tweets.map((tweet) =>
                <tr className="hover:bg-gray-100 duration-200">
                  <td className="py-3 px-2">{tweet.id}</td>
                  <td className="py-3 px-2">
                    <Link to={`/tweets/${tweet.id}`}>{tweet.full_text}</Link>
                  </td>
                  <td className="py-3 px-2">{tweet.date}</td>
                  <td className="py-3 px-2">Accessibility</td>
                  <td className="py-3 px-2">Positive</td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tweets;