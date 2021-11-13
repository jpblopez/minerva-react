import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ListSenti from './components/ListSenti';
import FlaskApi from '@/services/api';

const Sentiment = () => {
  const [open, setOpen] = useState(true);
  const [formats, setFormats] = useState('2020');
  const [tempData, setTempData] = useState([]);
  const [newIndex, setIndex] = useState(0);

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
    if (formats === '2020' || formats === '2021') {
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
    } else {
      dbData.forEach((data) => {
        const month = new Date(data.created_at).getMonth();
        if (data.sentiment === 'Positive') {
          postemp[month] += 1;
        } else if (data.sentiment === 'Neutral') {
          neutemp[month] += 1;
        } else if (data.sentiment === 'Negative') {
          negtemp[month] += 1;
        }
      });
    }
    setPositive(postemp);
    setNegative(negtemp);
    setNeutral(neutemp);
  }, [dbData, formats]);

  const chartData = {
    labels: tempData[newIndex]?.keywords,
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

  const chartBarOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
    const temp = [];
    FlaskApi.getModel().then((response) => {
      Object.keys(response.data).forEach((row) => {
        Object.keys(response.data[row]).forEach((col) => {
          const keywords = response.data[row][col];
          if (keywords.length !== 0) {
            temp.push({ row, col, keywords });
          }
        });
      });
      setTempData(temp);
    });
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

  const changeIndex = () => {
    const select = document.getElementById('select');
    setIndex(select.value);
    console.log(newIndex);
  };
  console.log(tempData);
  return (
    <>
      <Bar data={chartData} options={chartBarOptions} />
      <div className="max-h-screen overflow-hidden flex-col flex">
        <div className="h-auto w-full bg-gray-100 p-1.5">
          Clusters
          <div className="p-2">
            <select
              className="p-2 w-16"
              onChange={() => changeIndex()}
              id="select"
            >
              {tempData.map((item, index) => (
                <option value={index}>{index + 1}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-grow-0 max-h-1/2 overflow-scroll">
          {dbData.map((senti) => {
            if (formats === 'All Time') {
              return <ListSenti sentiData={senti} />;
            }
            if (formats === '2020' || formats === '2021') {
              const compareYear = new Date(senti.created_at).getYear();
              if (compareYear + 1900 === +formats) {
                return <ListSenti sentiData={senti} />;
              }
            }
            return '';
          })}
        </div>
      </div>
    </>
  );
};

export default Sentiment;
