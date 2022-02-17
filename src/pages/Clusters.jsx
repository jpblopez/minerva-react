import { Pie } from 'react-chartjs-2';

const piedata = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['#4830de', '#BC3636', '#858585'],
      borderColor: ['#4830de', '#BC3636', '#858585'],
      borderWidth: 1,
    },
  ],
};

const Clusters = () => {
  console.log('cluster');

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="main-color text-2xl mb-4">Clusters</h1>
      <div className="flex flex-row gap-4">
        <div className="w-1/2 h-full bg-white p-4 flex flex-row gap-4">
          <div className="w-1/2 mx-auto">
            <Pie data={piedata} />
          </div>
          <div className="w-1/2 mx-auto">
            <table className="w-full h-full">
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Positive</td>
                <td className="py-3 px-2">100%</td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Neutral</td>
                <td className="py-3 px-2">100%</td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Negative</td>
                <td className="py-3 px-2">100%</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 font-satoshi">
          <div className="main-color text-lg flex flex-row justify-between items-baseline">
            <span className="mb-4">Scraper</span>
          </div>
          <table className="w-full">
            <thead className="main-color text-lg">
              <tr>
                <td className="px-2">Word</td>
                <td className="px-2">Document Count</td>
                <td className="px-2">Document Frequency</td>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Learning</td>
                <td className="py-3 px-2">100%</td>
                <td className="py-3 px-2">100%</td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Learning</td>
                <td className="py-3 px-2">100%</td>
                <td className="py-3 px-2">100%</td>
              </tr>
              <tr className="hover:bg-gray-100 duration-200">
                <td className="py-3 px-2">Learning</td>
                <td className="py-3 px-2">100%</td>
                <td className="py-3 px-2">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full bg-white p-4 font-satoshi">
        <div className="main-color text-lg flex flex-row justify-between items-baseline">
          <span className="mb-4">Tweets</span>
        </div>
        <table className="w-full">
          <thead className="main-color text-lg">
            <tr>
              <td className="px-2">Tweet ID</td>
              <td className="px-2">Tweet</td>
              <td className="px-2">Date</td>
              <td className="px-2">Sentiment</td>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 duration-200">
              <td className="py-3 px-2">12345678</td>
              <td className="py-3 px-2">Test tweet</td>
              <td className="py-3 px-2">Nov. 01, 2021</td>
              <td className="py-3 px-2">Positive</td>
            </tr>
            <tr className="hover:bg-gray-100 duration-200">
              <td className="py-3 px-2">12345678</td>
              <td className="py-3 px-2">Test tweet</td>
              <td className="py-3 px-2">Nov. 01, 2021</td>
              <td className="py-3 px-2">Positive</td>
            </tr>
            <tr className="hover:bg-gray-100 duration-200">
              <td className="py-3 px-2">12345678</td>
              <td className="py-3 px-2">Test tweet</td>
              <td className="py-3 px-2">Nov. 01, 2021</td>
              <td className="py-3 px-2">Positive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clusters;
