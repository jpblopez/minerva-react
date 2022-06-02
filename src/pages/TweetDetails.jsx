import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import TweetController from '@/controllers/TweetController';
import TweetDataContext from '../context/TweetDataContext';

const TweetDetails = () => {
  const AppContext = useContext(TweetDataContext);
  const [tweet, setTweet] = useState([]);
  const [tfidf, setTfidf] = useState({});
  const [cleaned, setCleaned] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    TweetController.getSpecificTweet(id).then(response => {
      setTweet(response.data.data);
      setLocation(response.data.parameters);
      TweetController.getSpecificVectors(id)
        .then(responsetfidf => {
          let index = 0;
          for (const gram of responsetfidf.data.grams) {
            const tf =
              responsetfidf.data.df[index] / responsetfidf.data.word_count;
            const idf = Math.log(
              (AppContext.tweetData.length + 1) /
                (responsetfidf.data.idf[index] + 1) +
                1
            );
            index++;
            const temp = { ...tfidf, [gram]: tf * idf };
            setTfidf(val => ({ ...val, [gram]: tf * idf }));
          }
          setLoading(false);
          setCleaned(responsetfidf.data);
        })
        .catch(() => setLoading(false));
    });
  }, []);
  if (loading)
    return <div className="font-satoshi m-4">The page is loading</div>;

  if (!tweet) return <div className="font-satoshi m-4">Tweet not found</div>;
  const tweetDate = new Date(tweet.date).toLocaleDateString();
  const tweetDetails = AppContext.cleanedTweetData.filter(
    // eslint-disable-next-line eqeqeq
    data => data.tweet_id == tweet.conversation_id
  )[0];
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
            <div className="font-satoshi">{cleaned.cleaned}</div>
          </div>
          <div className="flex flex-row gap-8">
            <div className="bg-white p-4 w-1/2">
              <div className="text-lg main-color mb-4">Tokens</div>
              {tfidf
                ? Object.entries(tfidf).map(i => {
                    const [key, value] = i;
                    return (
                      <div className="flex flex-row justify-between w-full">
                        <span>{key}</span>
                        <span>{(+value).toFixed(2)}</span>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="w-1/2 bg-white p-4 font-satoshi">
              <div className="main-color text-lg flex flex-row justify-between items-baseline">
                <span className="mb-4">Cluster Data</span>
              </div>
              <table className="w-full">
                <thead className="main-color text-lg">
                  <tr>
                    <td className="px-2">Cluster</td>
                    <td className="px-2">Distance</td>
                    <td className="px-2">Sentiment</td>
                  </tr>
                </thead>
                <tbody>
                  {tweetDetails ? (
                    <tr className="hover:bg-gray-100 duration-200">
                      <td className="py-3 px-2">
                        {tweetDetails.cluster.row},{tweetDetails.cluster.col}
                      </td>
                      <td className="py-3 px-2">
                        {Number(tweetDetails.cluster.distance).toFixed(2)}
                      </td>
                      <td className="py-3 px-2">
                        {tweetDetails.overall_sentiment.sentiment}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No Data
                      </td>
                    </tr>
                  )}
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
              {tweet.id}
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
              <a className="break-words" href={tweet.link}>
                {tweet.link}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetails;
