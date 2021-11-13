import React from 'react'
import {
    Line
} from 'react-chartjs-2'


const TweetByMonth = (props) => {
    const { dbData } = props
    const timeNow = new Date()
    let timeTweet = new Date()
    let timeBetween = 0
    let timeLabelTemp = new Date()
    const tweetByDay = Array.from({ length: 12 }).fill(0)

    const labelList = [12]

    for (let i = 0; i < 12; i++) {
        timeLabelTemp = new Date()

        if (timeNow.getUTCMonth() - i < 0) {
            timeLabelTemp.setUTCFullYear(timeLabelTemp.getUTCFullYear())
            timeLabelTemp.setUTCMonth((timeNow.getUTCMonth() - i) % 12)
        }
        else {
            timeLabelTemp.setUTCMonth(timeNow.getUTCMonth() - i)
        }

        labelList[i] = timeLabelTemp.toUTCString().slice(8, 16)
    }

    dbData.forEach((tweet) => {
        timeTweet = new Date(tweet.created_at)
        timeBetween = timeNow.getUTCMonth() - timeTweet.getUTCMonth()
        if (timeBetween >= 0 && timeBetween < 12) {
            tweetByDay[timeBetween] += 1
        }
    })
    labelList.reverse()
    tweetByDay.reverse()
    const data = {
        labels: labelList,
        datasets: [
            {
                label: '# of Tweets past 12 months',
                data: tweetByDay,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-1',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
            ],
        },
        maintainAspectRatio: false,
    };
    return (
        <>
            <Line data={data} options={options} />
        </>
    )
}

export default TweetByMonth