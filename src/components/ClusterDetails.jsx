import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom'
import { AiOutlineArrowLeft as Back } from 'react-icons/ai';
import TweetController from '../controllers/TweetController';

const ClusterDetails = () => {
    const { id } = useParams();
    const history = useHistory();

    const [selectedCluster, setSelectedCluster] = useState(null);
    useEffect(() => {
        TweetController.getSpecificClusters(id).then((response)=>{
            setSelectedCluster(response.data)
        })
    }, [id])

    return (
        <div className="p-4">
            <div className='flex flex-row'>
                <Back size={24} className="text-black pr-2 cursor-pointer" onClick={history.goBack} />
                <h1 className="main-color text-2xl mb-4">Cluster Details</h1>
            </div>
            <div className="bg-white p-4 mb-4">
                <h2 className="py-4 text-3xl font-bold">Cluster ID: {id}</h2>
            </div>
            <div className="bg-white p-4">
                <table className="w-full">
                    <thead className="main-color text-lg">
                        <tr>
                            <td className="px-2">Word</td>
                            <td className="px-2">Weight</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedCluster != null &&
                            <>
                                {
                                    Object.keys(selectedCluster.top_words).map((word) =>
                                        <tr>
                                            <td className="px-2">{word}</td>
                                            <td className="px-2">{selectedCluster.top_words[word].toFixed(4)}</td>
                                        </tr>
                                    )
                                }
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClusterDetails