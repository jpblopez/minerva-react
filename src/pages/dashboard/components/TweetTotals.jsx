import React from 'react'


const TweetTotals = (props) => {
    const totalTweets = 10000
    const totalPos = 5000
    const totalNeg = 5000
    return (
        <>
            <div className = "flex flex-col justify-evenly">
                <h1 className="text-gray-600 text-sm s md:text-4xl truncate">Total Tweets</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate">Positive Tweets</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate">Negative Tweets</h1>
            </div>
            <div className = "flex flex-col justify-evenly">
                <h1 className="text-gray-600 text-sm s md:text-4xl truncate">{totalTweets}</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-green-500">{totalPos}</h1>
                <h1 className="text-gray-600 text-sm md:text-4xl truncate text-red-500">{totalNeg}</h1>
            </div>
        </>
    )
}

export default TweetTotals