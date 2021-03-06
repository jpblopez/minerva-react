import React, { useContext, useState } from 'react';
import PreprocessTweets from '../components/PreprocessedTweets';
import RawTweets from '../components/RawTweets';
import SOM from '../components/SOM';
import TFIDF from '../components/TFIDF';
import TweetDataContext from '../context/TweetDataContext';

const Process = () => {
  const AppContext = useContext(TweetDataContext);

  const [tabNo, setTabNo] = useState(0);
  const tabLabels = [
    'Step 1: Raw Tweets',
    'Step 2: Preprocess Tweets',
    'Step 3: Vectorization',
    'Step 4: Self-Organizing Map',
  ];

  const stepPages = [<RawTweets />, <PreprocessTweets />, <TFIDF />, <SOM />];

  return (
    <>
      <div className="text-faded mb-4 p-4">
        <h1 className="main-color text-2xl mb-4">Process</h1>
      </div>
      <div className="p-4 space-y-2 dark:bg-gray-800 dark:text-gray-100">
        <h3 className="text-base font-semibold">{tabLabels[tabNo]}</h3>
        <div className="flex space-x-3">
          {tabLabels.map((___, index) => {
            let bgColor = '';
            if (index < tabNo) {
              bgColor = 'w-12 h-2 rounded-sm cursor-pointer bg-green-400';
            } else if (index === tabNo) {
              bgColor = 'w-12 h-2 rounded-sm cursor-pointer bg-gray-600';
            } else {
              bgColor = 'w-12 h-2 rounded-sm cursor-pointer bg-gray-300';
            }
            return (
              <span
                className={bgColor}
                onClick={() => {
                  setTabNo(index);
                }}
                key={tabLabels[index]}
              />
            );
          })}
        </div>
      </div>
      <div className="bg-white p-4 font-satoshi">{stepPages[tabNo]}</div>
    </>
  );
};

export default Process;
