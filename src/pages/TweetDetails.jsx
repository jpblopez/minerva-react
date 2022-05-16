import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import TweetController from '@/controllers/TweetController';

const piedata = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['#4830de', '#BC3636', '#858585'],
      borderColor: ['#4830de', '#BC3636', '#858585'],
      borderWidth: 1,
    },
  ],
};

const TweetDetails = () => {
  const [tweet, setTweet] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    TweetController.getSpecificTweet(id).then(response => {
      console.log(response.data);
      setTweet(response.data.data);
      setLocation(response.data.parameters);
      setLoading(false);
    });
  }, [id]);
  if (loading)
    return <div className="font-satoshi m-4">The page is loading</div>;

  if (!tweet) return <div className="font-satoshi m-4">Tweet not found</div>;
  const tweetDate = new Date(tweet.date).toLocaleDateString();
  return (
    <div className="p-4">
      <div className="text-faded mb-4">
        <Link to="/tweets">&lt; Tweets</Link>
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-full">
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-2xl mb-4">Raw tweet</div>
            <div className="text-faded mb-2 font-satoshi">
              Tweeted on {tweetDate}
            </div>
            <div className="font-satoshi">{tweet.tweet}</div>
          </div>
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-2xl mb-4">Cleaned tweet</div>
            <div className="text-faded mb-2 font-satoshi">
              Tweeted on {tweetDate}
            </div>
            <div className="font-satoshi">{}</div>
          </div>
          <div className="flex flex-row gap-8">
            <div className="bg-white p-4 w-1/2">
              <div className="text-lg main-color mb-4">Tokens</div>
              <div className="flex flex-row justify-between w-full">
                <span>random</span>
                <span>0.857</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>tweet</span>
                <span>0.173</span>
              </div>
            </div>
            <div className="w-1/2 bg-white p-4 font-satoshi">
              <div className="main-color text-lg flex flex-row justify-between items-baseline">
                <span className="mb-4">Clusters Detected</span>
              </div>
              <table className="w-full">
                <thead className="main-color text-lg">
                  <tr>
                    <td className="px-2">Cluster</td>
                    <td className="px-2">Confidence</td>
                    <td className="px-2">Sentiment</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 duration-200">
                    <td className="py-3 px-2">Learning</td>
                    <td className="py-3 px-2">100%</td>
                    <td className="py-3 px-2">Positive</td>
                  </tr>
                  <tr className="hover:bg-gray-100 duration-200">
                    <td className="py-3 px-2">Learning</td>
                    <td className="py-3 px-2">100%</td>
                    <td className="py-3 px-2">Positive</td>
                  </tr>
                  <tr className="hover:bg-gray-100 duration-200">
                    <td className="py-3 px-2">Learning</td>
                    <td className="py-3 px-2">100%</td>
                    <td className="py-3 px-2">Positive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/5">
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-lg mb-4">Metadata</div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Tweet ID</div>
              {tweet.date}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Date</div>
              {tweetDate}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Likes</div>
              {tweet.retweets_count}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Retweets</div>
              {tweet.retweets_count}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Location</div>
              {location.location}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Link</div>
              <div className="w-100">
                <a href={tweet.link}>{tweet.link}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetails;
