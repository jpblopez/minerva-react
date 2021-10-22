import { useState, useEffect } from 'react';
import api from '@/services/api';
import Widget from '@/components/Widget';
import Table from '@/components/Table';

const dateToString = (date) => new Date(date.created_at).toLocaleDateString();
const arrayJoin = (col) => (arr) => arr[col].join(', ') || 'No tokens';

const Preprocessing = () => {
  const [data, setData] = useState([]);
  const [unigrams, setUnigrams] = useState();
  const [bigrams, setBigrams] = useState();
  const [trigrams, setTrigrams] = useState();
  const [headers, setHeaders] = useState(['ID', 'Tweet', 'Tweet Date']);
  const [cols, setCols] = useState(['id', 'full_text', dateToString]);

  useEffect(() => {
    api.getData().then((res) => {
      const { data: tweets } = res;

      setData(tweets);
    });
  }, []);

  useEffect(() => {
    const { a, b, c } = data.reduce(
      (acc, item) => {
        acc.a += item.unigrams.length;
        acc.b += item.bigrams.length;
        acc.c += item.trigrams.length;
        return acc;
      },
      {
        a: 0,
        b: 0,
        c: 0,
      }
    );

    setUnigrams(a);
    setBigrams(b);
    setTrigrams(c);
  }, [data]);

  const changeView = (i) => () => {
    if (i === 'tweets') {
      setHeaders(['ID', 'Tweet', 'Tweet date']);
      setCols(['id', 'full_text', dateToString]);
    }

    if (i === 'unigrams') {
      setHeaders(['ID', 'Tweet', 'Unigrams']);
      setCols(['id', 'full_text', arrayJoin('unigrams')]);
    } else if (i === 'bigrams') {
      setHeaders(['ID', 'Tweet', 'Bigrams']);
      setCols(['id', 'full_text', arrayJoin('bigrams')]);
    } else if (i === 'trigrams') {
      setHeaders(['ID', 'Tweet', 'Trigrams']);
      setCols(['id', 'full_text', arrayJoin('trigrams')]);
    } else if (i === 'tokens') {
      setHeaders(['ID', 'Tweet', 'Tokens']);
      setCols([
        'id',
        'full_text',
        function (item) {
          return [...item.unigrams, ...item.bigrams, ...item.trigrams].join(
            ', '
          );
        },
      ]);
    }
  };

  if (data.length === 0)
    return <div className="bg-white rounded-md shadow p-4">No tweets yet</div>;

  return (
    <div className="bg-white rounded-md shadow p-4">
      <div className="text-4xl ml-2 mb-8">Tweets</div>
      <div className="flex flex-row gap-8 mb-8 items-center">
        <Widget
          styling="bg-indigo-500 text-white cursor-pointer"
          title="Number of Tweets"
          text={data.length}
          onClick={changeView('tweets')}
        />
        <Widget
          styling="bg-green-400 text-white cursor-pointer"
          title="Number of Unigrams"
          text={unigrams}
          onClick={changeView('unigrams')}
        />
        <Widget
          styling="bg-gray-500 text-white cursor-pointer"
          title="Number of Bigrams"
          text={bigrams}
          onClick={changeView('bigrams')}
        />
        <Widget
          styling="bg-blue-400 text-white cursor-pointer"
          title="Number of Trigrams"
          text={trigrams}
          onClick={changeView('trigrams')}
        />
        <Widget
          styling="bg-pink-400 text-white cursor-pointer"
          title="Number of Tokens"
          text={unigrams + bigrams + trigrams}
          onClick={changeView('tokens')}
        />
      </div>
      <Table data={data} cols={cols} headers={headers} />
    </div>
  );
};

export default Preprocessing;
