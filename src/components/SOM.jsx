import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TweetController from '../controllers/TweetController';

const SOM = () => {
    const [clusterList, setClusterList] = useState(null)

    useEffect(() => {
        TweetController.getClusters().then((response) => {
            setClusterList(response.data.clusters)
        })
    }, [])


    return (<table className="w-full table-fixed">
        <thead className="main-color text-lg">
            <tr>
                <td className="px-2">Tweet ID</td>
                {
                    clusterList != null &&
                    <>
                        {
                            Object.keys(clusterList[0]).map((_, index) =>
                                <td>
                                    {index + 1}
                                </td>
                            )
                        }
                    </>
                }
            </tr>
        </thead>
        <tbody>
            {
                clusterList != null &&
                <>
                    {
                        clusterList.map((cluster, index) =>
                            <tr>
                                <td>
                                    <Link to={`/cluster/${index}`}>
                                        Cluster {index + 1}
                                    </Link>
                                </td>
                                {
                                    Object.keys(cluster).map((word) =>
                                        <td>
                                            {word}
                                        </td>
                                    )
                                }
                            </tr>

                        )}
                </>
            }
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

export default SOM;