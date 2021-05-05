import React from 'react'
import { Button } from '@material-ui/core';


const Summary = ({ reset, variants }) => {

    return (
        <>
            <p>{variants && variants.length}/10 answers</p>
            <Button
                variant="contained"
                color="primary"
                onClick={reset}>Reset</Button>
        </>
    )
}

export default Summary
