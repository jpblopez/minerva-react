import React from 'react'
import {
    Line
} from 'react-chartjs-2'


const TweetByDay = (props) => {
    const {dbData} = props
    const timeNow = new Date()
    let timeTweet = new Date()
    let timeLabelTemp = new Date()
    let timeBetween = 0
    const tweetByDay = Array.from({length:30}).fill(0)

    const labelList = [30]
    
    for (let i = 0; i<30; i++) {
        timeLabelTemp = new Date(timeNow.getTime() - (1000 * 60 * 60 * 24 * i))
        labelList[i] = timeLabelTemp.toUTCString().slice(5, 16)
    }

    dbData.forEach((tweet) => {
        timeTweet = new Date(tweet.created_at)
        timeBetween = parseInt((timeNow.getTime() - timeTweet.getTime()) / 1000 / 60 / 60 / 24, 10)

        if (timeBetween >= 0 && timeBetween < 30) {
            tweetByDay[timeBetween] += 1
        }
    })
    labelList.reverse()
    tweetByDay.reverse()
    const data = {
      labels: labelList,
      datasets: [
        {
          label: '# of Tweet past 30 days',
          data: tweetByDay,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
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

export default TweetByDay