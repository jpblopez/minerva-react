import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft as Back } from 'react-icons/ai';
import TweetController from '../controllers/TweetController';

const TFIDFDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const [selectedTweet, setSelectedTweet] = useState(null);
  const totalDocs = useRef(null);
  const totalDistance = useRef(null);
  useEffect(() => {
    TweetController.getVectors(id).then(response => {
      TweetController.getAll(false, true).then(response2 => {
        totalDocs.current = response2.data.length;
        const filteredTweet = response.data.filter(
          tweet => tweet.tweet_id === id
        );
        if (filteredTweet.length === 0) return;
        const hold = filteredTweet[0].grams.reduce(
          (acc, gram, index) =>
            acc +
            ((filteredTweet[0].df[index] /
              filteredTweet[0].df.reduce((acc2, currDf) => acc2 + currDf, 0)) *
              (Math.log(
                (totalDocs.current + 1) / (filteredTweet[0].idf[index] + 1)
              ) +
                1)) **
              2,
          0
        );
        totalDistance.current = Math.sqrt(hold);
        setSelectedTweet(filteredTweet[0]);
      });
    });
  }, [id]);

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <Back
          size={24}
          className="text-black pr-2 cursor-pointer"
          onClick={history.goBack}
        />
        <h1 className="main-color text-2xl mb-4">Step-By-Step Preprocessing</h1>
      </div>
      <div className="bg-white p-4 mb-4">
        <h2 className="py-4 text-3xl font-bold">Tweet ID: {id}</h2>
        {selectedTweet != null && (
          <section className="flex flex-col dark:bg-gray-800 text-xl dark:text-gray-100">
            <h3>
              <span className="font-bold">Raw:</span> {selectedTweet.full_text}
            </h3>
            <h3>
              <span className="font-bold">Clean:</span> {selectedTweet.cleaned}
            </h3>
          </section>
        )}
      </div>
      <div className="bg-white p-4">
        <table className="w-full">
          <thead className="main-color text-lg">
            <tr>
              <td className="px-2">Grams</td>
              <td className="px-2">t</td>
              <td className="px-2">d</td>
              <td className="px-2">TF</td>
              <td className="px-2">N + 1</td>
              <td className="px-2">df + 1</td>
              <td className="px-2">IDF</td>
              <td className="px-2">IDF (norm)</td>
              <td className="px-2">TF-IDF</td>
              <td className="px-2">TF-IDF (norm)</td>
            </tr>
          </thead>
          <tbody>
            {selectedTweet != null &&
              totalDocs.current != null &&
              totalDistance.current && (
                <>
                  {selectedTweet.grams.map((gram, index) => (
                    <tr>
                      <td className="px-2">{gram}</td>
                      <td className="px-2">{selectedTweet.df[index]}</td>
                      <td className="px-2">
                        {selectedTweet.df.reduce(
                          (acc, currDf) => acc + currDf,
                          0
                        )}
                      </td>
                      <td className="px-2">
                        {(
                          selectedTweet.df[index] /
                          selectedTweet.df.reduce(
                            (acc, currDf) => acc + currDf,
                            0
                          )
                        ).toFixed(2)}
                      </td>
                      <td className="px-2">{totalDocs.current + 1}</td>
                      <td className="px-2">{selectedTweet.idf[index] + 1}</td>
                      <td className="px-2">
                        {(
                          (totalDocs.current + 1) /
                          (selectedTweet.idf[index] + 1)
                        ).toFixed(2)}
                      </td>
                      <td className="px-2">
                        {(
                          Math.log(
                            (totalDocs.current + 1) /
                              (selectedTweet.idf[index] + 1)
                          ) + 1
                        ).toFixed(2)}
                      </td>
                      <td className="px-2">
                        {(
                          (selectedTweet.df[index] /
                            selectedTweet.df.reduce(
                              (acc, currDf) => acc + currDf,
                              0
                            )) *
                          (Math.log(
                            (totalDocs.current + 1) /
                              (selectedTweet.idf[index] + 1)
                          ) +
                            1)
                        ).toFixed(2)}
                      </td>
                      <td className="px-2">
                        {(
                          ((selectedTweet.df[index] /
                            selectedTweet.df.reduce(
                              (acc, currDf) => acc + currDf,
                              0
                            )) *
                            (Math.log(
                              (totalDocs.current + 1) /
                                (selectedTweet.idf[index] + 1)
                            ) +
                              1)) /
                          totalDistance.current
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TFIDFDetails;
