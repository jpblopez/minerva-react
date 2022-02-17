import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';

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
  const [tweet, setTweet] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTweet({
        raw: 'This is the tweet',
        cleaned: 'Cleaned',
        date: '2022-01-01',
        likes: 5,
        retweets: 10,
        id,
        link: 'https://twitter.com/status/13712837912',
      });

      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return <div className="font-satoshi m-4">The page is loading</div>;

  if (!tweet) return <div className="font-satoshi m-4">Tweet not found</div>;

  const tweetDate = new Date(tweet.date).toLocaleDateString();
  const location = tweet.location || 'No location';

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
            <div className="font-satoshi">{tweet.raw}</div>
          </div>
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-2xl mb-4">Cleaned tweet</div>
            <div className="text-faded mb-2 font-satoshi">
              Tweeted on {tweetDate}
            </div>
            <div className="font-satoshi">{tweet.cleaned}</div>
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
            <div className="bg-white p-4 w-1/2">
              <div className="text-lg main-color mb-4">Sentiment</div>
              <div className="w-1/2 mx-auto">
                <Pie data={piedata} />
              </div>
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
              {tweet.likes}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Retweets</div>
              {tweet.retweets}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Location</div>
              {location}
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Link</div>
              <a href={tweet.link}>{tweet.link}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetails;
