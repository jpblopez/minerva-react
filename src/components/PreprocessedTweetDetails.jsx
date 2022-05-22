import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom'
import { AiOutlineArrowLeft as Back, AiFillCaretLeft as Prev, AiFillCaretRight as Next } from 'react-icons/ai';
import TweetController from '../controllers/TweetController';

const PreprocessedTweetDetails = () => {
    const { id } = useParams();
    const [tweetSteps, setTweetSteps] = useState(null)
    const history = useHistory();

    const [stepNo, setStepNo] = useState(0)
    const [showAll, setShowAll] = useState(false)

    const handleStepChange = (increment) => {
        if (stepNo + increment < 0) return;
        if (stepNo + increment >= 12) return;

        setStepNo((prevStepNo) => prevStepNo + increment)
    }

    const stepLabels = [
        'Raw Tweet',
        'Remove Users',
        'Remove Links',
        'Remove Hashtags',
        'Remove A/V tags',
        'Remove HTML Tags',
        'Remove Non-ASCII',
        'Set To Lower-Case',
        'Separate Contractions',
        'Remove Punctuations',
        'Remove Double Spacing',
        'Remove Numbers',
    ]

    useEffect(() => {
        TweetController.getSpecificTweetSteps(id).then((response) => {
            setTweetSteps(response.data)
        })
    }, [id])

    return (
        <div className="p-4">
            <div className='flex flex-row'>
                <Back size={24} className="text-black pr-2 cursor-pointer" onClick={history.goBack} />
                <h1 className="main-color text-2xl mb-4">Step-By-Step Preprocessing</h1>
            </div>
            <div className="bg-white p-4 mb-4"><section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto flex flex-col p-6">
                    <h2 className="py-4 text-3xl font-bold mb-4">Tweet ID: {id}</h2>
                    <span className='text-blue-500 hover:text-blue-700 cursor-pointer' onClick={() => {
                        setShowAll(prev => !prev)
                    }}>
                        {showAll ? "Hide steps" : "Show entire process"}
                    </span>
                    <div className="flex flex-row gap-x-4 mt-4">
                        <div className="flex justify-center select-none items-center w-20 cursor-pointer hover:bg-gray-200" onClick={() => {
                            handleStepChange(-1)
                        }}>
                            <Prev size={24} className="text-black" />
                        </div>
                        <div className="flex flex-col col-span-full lg:text-left">
                            <span className="text-xl font-bold md:text-2xl">Step {stepNo + 1}: {stepLabels[stepNo]}</span>
                            <span className="mt-4 text-xl dark:text-gray-300">{(tweetSteps != null && tweetSteps.steps[stepNo])}</span>
                        </div>
                        <div className="flex justify-center select-none items-center w-20 cursor-pointer hover:bg-gray-200" onClick={() => {
                            handleStepChange(1)
                        }}>
                            <Next size={24} className="text-gray-700"/>
                        </div>
                    </div>
                    {
                        (tweetSteps == null && <div className="p-8">Loading...</div>) ||
                        (showAll && <div className="grid grid-cols-2 mt-14 gap-y-4">
                            {
                                stepLabels.map((label, index) =>
                                    <div className="px-8 py-8">
                                        <div className="flex flex-col col-span-full lg:text-left">
                                            <span className={`text-xl font-bold md:text-2xl ${index === stepNo ? "bg-green-200" : ""}`}>Step {index + 1}: {label}</span>
                                            <span className="mt-4 text-xl dark:text-gray-300">{(tweetSteps != null && tweetSteps.steps[index])}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>)
                    }
                </div>
            </section>
            </div>
        </div>
    )
}

export default PreprocessedTweetDetails