import React, { useState } from 'react';
import TweetController from '@/controllers/TweetController';

const generateResultView = (original, result) => {
  const {
    cleaned,
    grams,
    overall_sentiment: { sentiment, score },
    // eslint-disable-next-line camelcase
    chunk_details,
  } = result;

  const empty = '--Empty--';

  const c = cleaned || empty;
  const g = grams.length ? grams.join(', ') : empty;
  const d = chunk_details.length
    ? chunk_details.map(cl => (
        <tr>
          <td>{cl.chunk}</td>
          <td>
            {cl.cluster.row}, {cl.cluster.col}
          </td>
          <td>{cl.cluster.distance}</td>
          <td>{cl.sentiment}</td>
          <td>{cl.score}</td>
        </tr>
      ))
    : <tr>
      <td colSpan="5" className='text-center'>{empty}</td>
    </tr>

  return (
    <>
      <div className="mb-4">
        <div className="main-color text-lg opacity-80">Raw tweet</div>
        <div>{original}</div>
      </div>
      <div className="mb-4">
        <div className="main-color text-lg opacity-80">Cleaned tweet</div>
        <div>{c}</div>
      </div>
      <div className="mb-4">
        <div className="main-color text-lg opacity-80">Grams</div>
        <div>{g}</div>
      </div>
      <div className="mb-4">
        <div className="main-color text-lg opacity-80">Overall Sentiment</div>
        <div>
          {sentiment}: {score}
        </div>
      </div>
      <div className="mb-4">
        <div className="main-color text-lg opacity-80">Cluster</div>
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th>Chunk</th>
              <th>Cluster</th>
              <th>Cluster distance</th>
              <th>Sentiment</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{d}</tbody>
        </table>
      </div>
    </>
  );
};

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [results, setResults] = useState();

  const submit = async () => {
    setLoading(true);
    setResults(null);

    try {
      const res = await TweetController.analyzeTweet(tweet);
      setResults(res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleChange = e => {
    setResults(null);
    setTweet(e.target.value);
  };

  const disabled = !tweet || loading;

  const classname = disabled
    ? 'standard-faded-btn opacity-30 cursor-not-allowed'
    : 'standard-green-btn';

  return (
    <div className="p-4 flex flex-row gap-4">
      <div className="bg-white p-4">
        <div className="text-faded mb-4">
          <h1 className="main-color text-2xl mb-4">Input a tweet</h1>
        </div>
        <div className="mb-4">
          Input a new tweet to find the cluster it belongs and its sentiment
        </div>
        <div className="mb-2">
          <textarea
            rows="9"
            type="text"
            className="w-full outline-none border-2 border-gray-100 p-2 hover:border-blue-500 focus:border-blue-500 transition duration-100 resize-none"
            placeholder="Write a tweet"
            value={tweet}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className={`${classname} p-2`}
          onClick={() => submit()}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
      <div className="p-4 bg-white w-full">
        <div className="text-faded mb-4">
          <h1 className="main-color text-2xl mb-4">Results</h1>
        </div>
        {!results ? 'No results yet' : generateResultView(tweet, results)}
      </div>
    </div>
  );
};

export default Input;
