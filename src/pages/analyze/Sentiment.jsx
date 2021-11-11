import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ListSenti from './components/ListSenti';
import FlaskApi from '@/services/api';

const Sentiment = () => {
  const [open, setOpen] = useState(true);
  const [formats, setFormats] = useState('2020');

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const [positive, setPositive] = useState(Array(12).fill(0));
  const [negative, setNegative] = useState(Array(12).fill(0));
  const [neutral, setNeutral] = useState(Array(12).fill(0));

  /* TODO: replace useState with api call */
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    const postemp = Array(12).fill(0);
    const neutemp = Array(12).fill(0);
    const negtemp = Array(12).fill(0);
    dbData.forEach((data) => {
      const month = new Date(data.created_at).getMonth();
      const year = new Date(data.created_at).getYear();
      if (year + 1900 === +formats) {
        if (data.sentiment === 'Positive') {
          postemp[month] += 1;
        } else if (data.sentiment === 'Neutral') {
          neutemp[month] += 1;
        } else if (data.sentiment === 'Negative') {
          negtemp[month] += 1;
        }
      }
    });
    // console.log(postemp);
    setPositive(postemp);
    setNegative(negtemp);
    setNeutral(neutemp);
    // console.log(positive);
  }, [dbData, formats]);

  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Negative',
        data: negative,
        backgroundColor: '#F87171',
      },
      {
        label: 'Neutral',
        data: neutral,
        backgroundColor: '#60A5FA',
      },
      {
        label: 'Positive',
        data: positive,
        backgroundColor: '#34D399',
      },
    ],
  };

  const chartOptions = {
    redraw: true,
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    FlaskApi.getData().then((response) => {
      setDbData(response.data);
    });
    document.querySelector('.year-button').classList.add('bg-indigo-500');
    document.querySelector('.year-button').classList.add('text-white');
  }, []);

  const change = (e, year) => {
    document.querySelectorAll('.year-button').forEach((item) => {
      item.classList.remove('bg-indigo-500');
      item.classList.remove('text-white');
    });
    e.target.classList.add('bg-indigo-500');
    e.target.classList.add('text-white');
    setFormats(year);
  };

  return (
    <>
      <Bar data={chartData} options={chartOptions} />
      <div className="max-h-screen overflow-hidden flex-col flex">
        <div className="h-auto w-full bg-gray-100 p-1.5">
          <div>
            <button
              className="text-center p-2 bg-grey-200 border-4 mr-4 year-button"
              type="button"
              value="2020"
              onClick={(e) => change(e, '2020')}
            >
              2020
            </button>
            <button
              className="text-center p-2 bg-grey-200 border-4 mr-4 year-button"
              type="button"
              value="2021"
              onClick={(e) => change(e, '2021')}
            >
              2021
            </button>
          </div>
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
