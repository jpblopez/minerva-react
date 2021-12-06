import { Link } from 'react-router-dom';

const Tweets = () => {
  console.log('this is a test');

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
            <tr className="hover:bg-gray-100 duration-200">
              <td className="py-3 px-2">123219873946</td>
              <td className="py-3 px-2">
                <Link to="/tweets/1">This is just a random tweet ahaha</Link>
              </td>
              <td className="py-3 px-2">2021-11-01</td>
              <td className="py-3 px-2">Accessibility</td>
              <td className="py-3 px-2">Positive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tweets;
