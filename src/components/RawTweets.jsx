import React from 'react';

const RawTweets = () => {
    const temp = 0;
    
    return (<table className="w-full table-fixed">
        <thead className="main-color text-lg">
            <tr>
                <td className="px-2">Tweet ID</td>
                <td className="px-2">Raw Tweet</td>
            </tr>
        </thead>
        <tbody>
            {/* {
                tweets.map((tweet, index) => {
                    if (index < (page - 1) * pageSize || index >= page * pageSize) return <></>
                    return (<tr className="hover:bg-gray-100 duration-200" key={tweet.id}>
                        <td className="py-3 px-2" key={tweet.id}>
                            {tweet.id}
                        </td>
                        <td className="py-3 px-2">
                            <Link to={`/tweets/${tweet.id}`}>{tweet.full_text}</Link>
                        </td>
                        <td className="py-3 px-2" key={tweet.date}>
                            {tweet.date}
                        </td>
                        <td className="py-3 px-2">Accessibility</td>
                        <td className="py-3 px-2" key={tweet.sentiment}>
                            {tweet.sentiment}
                        </td>
                    </tr>)
                })
            } */}
        </tbody>
    </table>)
}

export default RawTweets;