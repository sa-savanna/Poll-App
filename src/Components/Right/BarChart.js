import React, { useState } from 'react'
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core'
import { Animation } from '@devexpress/dx-react-chart';




const BarChart = ({ variants }) => {

    const data = [...variants]

    let valueX, valueY = []

    if (data.length === 0) {
        valueX = 0
        valueY = "option"
    } else {
        valueX = data.map(val => Object.keys(val))[0][0]
        valueY = data.map(val => Object.keys(val))[0][1]
    }


    const getMaxVotes = (options) => {
        return Math.max(...options.map(option => option.votes))
    }

    const [max] = useState(getMaxVotes(data))

    return (
        <>
            <Paper >
                <Chart
                    data={data}
                >
                    <ArgumentAxis />
                    <ValueAxis max={max} />

                    <BarSeries
                        valueField={valueY}
                        argumentField={valueX}
                    />

                    <Animation />
                </Chart>
            </Paper>
        </>
    )
}

export default BarChart
