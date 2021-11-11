import { React, useState, useEffect } from 'react';
import Table from '@/components/Table'
import api from '@/services/api';
import ModelTable from './components/ModelTable'

const ModelBuilding = () => {
  const [model, setModel] = useState([])

  useEffect(() => {
    api.getModel().then((res) => {
      const { data: modelData } = res;
      setModel(modelData);
    });
  }, []);
  return (
    <>
      <div className="bg-white rounded-md shadow p-4 w-full">
        <div className="text-4xl ml-2 mb-8">The SOM Model</div>
        <div>
          <ModelTable data={model} />
        </div>
      </div>
    </>
  );
}

export default ModelBuilding