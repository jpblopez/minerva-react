import React, { useEffect, useState } from 'react';
import TweetController from '../controllers/TweetController';

const RawTweets = () => {
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [tweetList, setTweetList] = useState(null)

    useEffect(() => {
        TweetController.getAll(false).then((response) => {
            setTweetList(response.data)
        })
    }, [])

    const totalPages = tweetList == null ? 0 : Math.ceil(tweetList.length / pageSize)

    const handlePagination = (increment) => {
        setPage(prevPage => {
            if (prevPage + increment < 1) return 1
            if (prevPage + increment > totalPages) return totalPages
            return prevPage + increment
        })
    }


    return (
        <>
            {
                tweetList != null && tweetList.length > pageSize &&
                <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex mb-2 ml-2">
                    <span className="block">Page {page} of {totalPages}</span>
                    <div className="space-x-1">
                        <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow" onClick={() => { handlePagination(-1) }}>
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow" onClick={() => { handlePagination(1) }}>
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
            <table className="w-full table">
                <thead className="main-color text-lg">
                    <tr>
                        <td className="px-2">Tweet ID</td>
                        <td className="px-2">Raw Tweet</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        (tweetList === null && <span className='px-2 pt-2'>Loading...</span>) ||
                        tweetList.map((tweet, index) => {
                            if (index < (page - 1) * pageSize || index >= page * pageSize) return <></>
                            return (<tr className="hover:bg-gray-100 duration-200" key={tweet.id}>
                                <td className="py-3 px-2" key={tweet.id}>
                                    {tweet.tweet_id}
                                </td>
                                <td className="py-3 px-2">
                                    {/* <Link to={`/tweets/${tweet.id}`}>{tweet.full_text}</Link> */}
                                    {tweet.full_text}
                                </td>
                            </tr>)
                        }
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default RawTweets;