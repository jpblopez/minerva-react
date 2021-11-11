import { useState, useEffect, useCallback, useMemo } from 'react';
import Loading from '@/components/Loading';

import api from '@/services/api';

const computeClass = (v, id) => {
  const base =
    'transition ease-in-out duration-400 px-3 py-1 primary-active w-32 mr-4 rounded';

  if (v !== id) return `${base} border border-indigo-300 text-indigo-300`;

  return `${base} text-white bg-indigo-500 shadow-sm`;
};

const Tokens = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState('all');

  const changeView = useCallback((v) => () => setView(v), [setView]);

  useEffect(() => {
    setLoading(true);

    api
      .getTokens()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const dataView = useMemo(() => {
    console.log(data);
    if (!data) return;

    if (view === 'all') return data.frequencies;

    const map = {};

    Object.keys(data[view]).forEach((key) => {
      map[key] = data.frequencies[key];
    });

    return map;
  }, [view, data]);

  const renderTable = Object.entries(dataView).length > 0;

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          className={computeClass(view, 'all')}
          onClick={changeView('all')}
        >
          All Tokens
        </button>

        <button
          type="button"
          className={computeClass(view, 'uni')}
          onClick={changeView('uni')}
        >
          Unigrams
        </button>
        <button
          type="button"
          className={computeClass(view, 'bi')}
          onClick={changeView('bi')}
        >
          Bigrams
        </button>
        <button
          type="button"
          className={computeClass(view, 'tri')}
          onClick={changeView('tri')}
        >
          Trigrams
        </button>
      </div>
      {loading ? (
        <Loading styling="mt-16" />
      ) : data && renderTable ? (
        <table>
          <thead>
            <tr>
              <td>Token</td>
              <td>Number of containing documents</td>
              <td>Total number of occurences</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(dataView).map((key) => {
              const item = dataView[key];

              return (
                <tr>
                  <td>{key}</td>
                  <td>{item.dfs}</td>
                  <td>{item.cfs}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        'No data available'
      )}
    </>
  );
};

export default Tokens;
