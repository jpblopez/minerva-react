import { useState, useEffect, useCallback } from 'react';

const Table = ({ data, cols, headers }) => {
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      setPages(Math.ceil(data.length / 10));

      const start = active * 10;
      const end = Math.min(start + 10, data.length);
      const viewable = data.slice(start, end);

      setCurrent(viewable);
    }
  }, [data, setCurrent, active]);

  const changeActive = useCallback((i) => () => setActive(i), []);

  if (!data || !data.length) return 'No data available';

  return (
    <>
      <table className="scroll-table">
        <thead>
          {headers.map((item) => (
            <>
              <td className="p-2 text-md">
                <div>{item}</div>
              </td>
            </>
          ))}
        </thead>
        <tbody>
          {current.map((item, index) => {
            const container = `${
              index % 2 === 0 ? 'bg-gray-100' : ''
            } hover:bg-indigo-50 cursor-default`;

            return (
              <tr className={container} key={item.id}>
                {cols.map((col) => {
                  if (typeof col === 'string')
                    return <td className="p-2">{item[col]}</td>;
                  if (typeof col === 'function')
                    return <td className="p-2">{col(item)}</td>;

                  return 'ERROR';
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row mt-4">
        {Array.from({ length: pages }, (x, index) => {
          const name = `p-1 text-center flex-grow-0 flex-shrink-1 ${
            active === index ? 'bg-indigo-600 text-white' : ''
          }`;
          const style = {
            width: '50px',
          };
          return (
            <button
              type="button"
              className={name}
              style={style}
              key={index}
              onClick={changeActive(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Table;
