import React, {useContext} from 'react'
import BarChart from './BarChart'
import { DataContext } from "../../DataContext"




const RightSection = () => {

    const { totalVotes} = useContext(DataContext);

    return (
        <div className="right-section">
            <BarChart />

            <div className='right-bottom'>
                <p>Total votes: {totalVotes && totalVotes}</p>
            </div>
        </div>

    )
}

export default RightSection
