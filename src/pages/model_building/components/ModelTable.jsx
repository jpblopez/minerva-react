import React from 'react'


const ModelTable = ({ data }) => {
    const tempData = []
    console.log(data)


    Object.keys(data).forEach(row => {
        Object.keys(data[row]).forEach(col => {
            const keywords = data[row][col]
            if (keywords.length !== 0) {
                tempData.push({ row, col, keywords })
            }
        })
    })

    console.log(tempData)
    return (
        <>
            <table className="scroll-table w-full">
                <thead >
                    <td className="p-2 text-md">
                        Cluster No.
                    </td>
                    <td>
                        Keywords
                    </td>
                </thead>
                <tbody>
                    {tempData.map((item, index) => {
                        const container = `${index % 2 === 0 ? 'bg-gray-100' : ''
                            } hover:bg-indigo-50 cursor-default`;

                        return (
                            <>
                                <tr className={container}>
                                    <td>
                                        ({item.row}) ,
                                        ({item.col})
                                    </td>
                                    <td>
                                        {item.keywords.map((keyword) => (<>{keyword}, </>))}
                                    </td>
                                </tr>
                            </>
                        )
                    }
                    )}
                </tbody>

            </table>
        </>
    )
}

export default ModelTable