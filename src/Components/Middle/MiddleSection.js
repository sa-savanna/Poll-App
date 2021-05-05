import React, { useContext } from 'react'
import Variants from './Variants';
import { Button } from '@material-ui/core';
import { DataContext } from "../../DataContext"



const MiddleSection = ({ handleSeceltedChange, sumbitVote }) => {

    const { question } = useContext(DataContext);
   
    return (
        <div className="middle-section">
            <div className="middle-main">
                <h1>{question && question}</h1>
                <Variants
                    handleChange={handleSeceltedChange}

                />
            </div>

            <div className='middle-bottom'>
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
