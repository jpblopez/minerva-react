import { useState, useCallback, useEffect } from 'react';
import api from '@/services/api';
import Table from '@/components/Table';

const computeClass = (v, id) => {
  const base =
    'transition ease-in-out duration-400 px-3 py-1 primary-active w-24 mr-4 rounded';

  if (v !== id) return `${base} border border-indigo-300 text-indigo-300`;

  return `${base} text-white bg-indigo-500 shadow-sm`;
};

const dateToString = (date) => new Date(date.created_at).toLocaleDateString();

const cols = {
  raw: ['id', 'full_text', dateToString],
  cleaned: ['id', 'preprocessed', dateToString],
};

const headers = ['ID', 'Tweet', 'Tweet Date'];

const Tweets = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [view, setView] = useState('raw');

  const changeView = useCallback((v) => () => setView(v), [setView]);

  useEffect(() => {
    setLoading(true);
    api
      .getData()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="mb-4">
        <button
          type="button"
          className={computeClass(view, 'raw')}
          onClick={changeView('raw')}
        >
          Raw
        </button>
        <button
          type="button"
          className={computeClass(view, 'cleaned')}
          onClick={changeView('cleaned')}
        >
          Cleaned
        </button>
      </div>
      <Table data={data} cols={cols[view]} headers={headers} />
    </div>
  );
};

export default Tweets;
