import React, { useState } from 'react';
import TweetController from '@/controllers/TweetController'

const Input = () => {
  const [loading, setLoading] = useState(false)
  const [tweet, setTweet ] = useState('')

  const submit = async () => {
    setLoading(true)
    try {
      const res = await TweetController.analyzeTweet(tweet)
      console.log(res);
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setTweet(e.target.value)
  }

  const disabled = !tweet || loading

  const classname = disabled ? 'standard-faded-btn opacity-30 cursor-not-allowed' : 'standard-green-btn'

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
        <button type='button' className={`${classname} p-2`} onClick={() => submit()} disabled={disabled}>
            Submit
        </button>
      </div>
      <div className="p-4 bg-white w-full">
        <div className="text-faded mb-4">
          <h1 className="main-color text-2xl mb-4">Process</h1>
        </div>
      </div>
    </div>
  );
};

export default Input;
