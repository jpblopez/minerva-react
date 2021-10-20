import React from 'react'


const ListSenti = (props) => {
    const listDisplay = "inline-block ";

    const {sentiData} = props
    /*
    sentiData props:
    name
    tweet
    */
    
    return (
        <>
        <div className="block bg-white m-2 h-auto rounded-md p-2 flex flex-row">
            <div className = "inline-block m-1.5 mr-2.5 flex-grow-0 flex-shrink-0 overflow-hidden" style = {{height: '75px', width: '75px', borderRadius: '37.5px'}}><img src = "assets/Topias.png" /></div>
            <div className = "inline-block">
                <p className = "block">{sentiData.sentiment}</p>
                <p className = "block">{sentiData.tweet}</p>
            </div>
        </div>
        </>
    )
}

export default ListSenti;