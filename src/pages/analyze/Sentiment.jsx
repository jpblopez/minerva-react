import React, { useState, useEffect } from 'react';
import ListSenti from './components/ListSenti';
import FlaskApi from '@/services/api';

const Sentiment = () => {
  const [open, setOpen] = useState(true);

  /* TODO: replace useState with api call */
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    FlaskApi.getSentiment().then((response) => {
      setDbData(response.data);
      console.log(response.data);
    });
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000); // remove this later
  };

  return (
    <>
      <div className="max-h-screen overflow-hidden flex-col flex">
        <p>Graph</p>
      </div>
      <div className="max-h-screen overflow-hidden flex-col flex">
        <div className="h-auto w-full bg-gray-100 p-1.5">
          <input type="text" name="searchBar" className="mr-2 rounded-sm" />
          <input type="submit" name="searchSubmit" value="Search" />
        </div>
        <div className="flex-grow-0 max-h-1/2 overflow-scroll">
          {dbData.map((senti) => (
            <ListSenti sentiData={senti} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sentiment;
