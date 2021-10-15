import React from 'react'


const ListItem = (props) => {
    const listDisplay = "inline-block ";

    const {tweetData} = props
    /*
    tweetData props:
    name
    tweet
    */
    
    return (
        <>
        <div className="block bg-white m-2 h-auto">
            <div className = "inline-block h-100px w-100px m-1.5">PICTURE</div>
            <div className = "inline-block">
                <p className = "block">{tweetData.name}</p>
                <p className = "block">{tweetData.tweet}</p>
            </div>
        </div>
        </>
    )
}

export default ListItem;