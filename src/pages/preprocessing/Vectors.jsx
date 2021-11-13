import { useState, useEffect } from 'react';
import api from '@/services/api';
import Loading from '@/components/Loading';

const Vectors = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getVectors()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 rounded-md bg-white">
      <h1 className="text-4xl mb-4">TF IDF</h1>
      {loading ? <Loading styling="my-16" /> : 'there is data'}
    </div>
  );
};

export default Vectors;
