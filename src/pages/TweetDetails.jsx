import { Link } from 'react-router-dom';
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
  console.log('aha');

  return (
    <div className="p-4">
      <div className="text-faded mb-4">
        <Link to="/tweets">&lt; Tweets</Link>{' '}
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-full">
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-2xl mb-4">Raw tweet</div>
            <div className="text-faded mb-2 font-satoshi">
              Tweeted on November 11, 2021
            </div>
            <div className="font-satoshi">This is a random tweet</div>
          </div>
          <div className="bg-white p-4 mb-4">
            <div className="main-color text-2xl mb-4">Cleaned tweet</div>
            <div className="text-faded mb-2 font-satoshi">
              Tweeted on November 11, 2021
            </div>
            <div className="font-satoshi">random tweet</div>
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
              12316681722350
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Date</div>
              November 1, 2021
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Likes</div>
              766
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Retweets</div>
              619
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Location</div>
              Cebu City, Cebu
            </div>
            <div className="font-satoshi mb-4">
              <div className="text-faded">Link</div>
              random link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetails;
