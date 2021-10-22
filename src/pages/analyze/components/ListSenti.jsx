import React from 'react';

const ListSenti = (props) => {
  const listDisplay = 'inline-block ';

  const { sentiData } = props;
  let classname;
  /*
    sentiData props:
    name
    tweet
    */
  if (sentiData.sentiment === 'Negative') {
    classname = 'text-red-400 font-bold';
  } else if (sentiData.sentiment === 'Positive') {
    classname = 'text-green-400 font-bold';
  } else if (sentiData.sentiment === 'Neutral') {
    classname = 'text-blue-400 font-bold';
  }

  return (
    <>
      <div className="block bg-white m-2 h-auto rounded-md p-2 flex flex-row">
        <div className="inline-block">
          <p className={classname}>{sentiData.sentiment}</p>
          <p className="block">{sentiData.full_text}</p>
        </div>
      </div>
    </>
  );
};

export default ListSenti;
