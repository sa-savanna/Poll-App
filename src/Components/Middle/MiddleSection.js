import React from 'react'
import Variants from './Variants';
import { Button } from '@material-ui/core';



const MiddleSection = ({ handleSeceltedChange, sumbitVote, question, variants }) => {

    return (
        <div className="middle-section">
            <div className="middle-main">
                <h1>{question && question}</h1>
                <Variants
                    handleChange={handleSeceltedChange}
                    variants={variants}
                />
            </div>

            <div className='middle-footer'>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => sumbitVote()}>Vote</Button>
            </div>

        </div>
    )
}

export default MiddleSection
