import React from 'react'


const TweetTotals = ({tweetData}) => {
    let totalTweets = 0
    let totalPos = 0
    let totalNeut = 0
    let totalNeg = 0
    Object.keys(tweetData).forEach((key) => {
        totalTweets += 1
        switch(tweetData[key].sentiment) {
            case 'Positive':
                totalPos += 1
                break;
            case 'Neutral':
                totalNeut += 1
                break;
            case 'Negative':
                totalNeg += 1
                break;
            default:
                break;
        }
    })
    return (
        <>
            <div className = "flex flex-col justify-evenly">
                <h1 className="text-gray-600 text-sm md:text-4xl truncate">Positive Tweets</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate">Neutral Tweets</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate">Negative Tweets</h1>
                <h1 className="text-gray-600 text-sm s md:text-4xl truncate">Total Tweets</h1>
            </div>
            <div className = "flex flex-col justify-evenly">
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-green-500">{totalPos}</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-yellow-500">{totalNeut}</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-red-500">{totalNeg}</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-black">{totalTweets}</h1>
            </div>
        </>
    )
}

export default TweetTotals