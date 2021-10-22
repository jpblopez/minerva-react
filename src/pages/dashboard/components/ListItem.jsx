import React from 'react';

const ListItem = (props) => {
    /*
    tweetData props:
    full_text   - The tweet's body
    isVisible   - Should the tweet be displayed
    */
    const {tweetData} = props
    const listClass = tweetData.isVisible ? "block bg-white m-2 h-auto rounded-md p-2 flex flex-row" : "block bg-white m-2 h-auto rounded-md p-2 flex flex-row hidden"
    
    return (
        <>
        <div className= {listClass}>
            <div className = "inline-block m-1.5 mr-2.5 flex-grow-0 flex-shrink-0 overflow-hidden" style = {{height: '75px', width: '75px', borderRadius: '37.5px'}}><img src = "assets/Topias.png" /></div>
            <div className = "inline-block">
                <p className = "block"> Topias &quot;Flopson&quot;  Daddy</p>
                <p className = "block">{tweetData.full_text}</p>
            </div>
        </div>
    </>
  );
};

export default ListItem;
