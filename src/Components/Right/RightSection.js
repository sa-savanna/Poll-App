import React from 'react'
import BarChart from './BarChart'



const RightSection = ({ totalVotes, variants }) => {

     
    return (
        <div className="right-section">
            <BarChart variants={variants} />

            <div className='right-footer'>
                <p>Total votes: {totalVotes && totalVotes}</p>
            </div>
        </div>

    )
}

export default RightSection
