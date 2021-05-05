import React, { useState } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';


const Home = () => {

    const [selected, setSelected] = useState("")
    const [question, setQuestion] = useState("What is the value of PI?")
    const [totalVotes, setTotalVotes] = useState(0)
    const [variants, setVariant] = useState([
        { option: '3.14', votes: 0 },
        { option: '3.1416', votes: 0 },
    ])


    const submitOption = (addOption) => {
        const updatedOptions = [...variants, { option: addOption, votes: 0 }]
        setVariant(updatedOptions)
    }

    const deleteOption = (idx) => {
        let newVariants = [...variants]
        newVariants.splice(idx, 1)
        setVariant(newVariants)
    }

    const onReset = () => {
        setVariant([])
        setTotalVotes(0)
    }

    const handleSeceltedChange = (e) => {
        let selectedOption = e.target.value
        setSelected(selectedOption)
        
    }

    const sumbitVote = () => {
        setVariant(variants =>
            variants.map(answer =>
                answer.option === selected ? { ...answer, votes: answer.votes + 1, } : answer
            ))
        setTotalVotes(totalVotes + 1)
        
    }


    return (

        <div className="App">

            <LeftSection
                deleteOption={deleteOption}
                submitOption={submitOption}
                onReset={onReset}
                variants={variants}
                question={question}
            />

            <MiddleSection
                handleSeceltedChange={handleSeceltedChange}
                sumbitVote={sumbitVote}
                question={question}
                variants={variants}
            />

            <RightSection
                totalVotes={totalVotes}
                variants={variants} />

        </div>
    )
}

export default Home;
