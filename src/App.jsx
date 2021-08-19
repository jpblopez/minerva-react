import React from 'react';

const style = {
  width: '500px',
  height: 'min-content',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'contain',
};

function App() {
  return (
    <>
      <div
        className="text-white bg-gray-800 rounded-md mx-auto mt-12 flex flex-row"
        style={style}
      >
        <div className="py-4 px-2">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"
            style={imgStyle}
          />
        </div>
        <div className="flex-grow-1 flex flex-col justify-center py-4 px-2">
          <p className="text-3xl">Minerva</p>
          <p className="text-gray-400 text-sm">
            Opinion mining of tweets using Self-organizing map
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
