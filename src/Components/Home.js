import React, { useState, useContext, useEffect, useCallback } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';
import { DataContext } from "../DataContext"
import axios from '../axios'

const Home = () => {

    const { question, totalVotes, variants, loading, setLoading, findId } = useContext(DataContext);

    const [selected, setSelected] = useState("")
    const [options, setOptions] = useState([])

    useEffect(() => {
        variants && setOptions([...variants])
    }, [setOptions, variants])


    const updateData = useCallback((route, option) => {
        setLoading(true)
        axios.put(`${route}`, option)
            .then(res => {
                console.log("Successfuly")
                setLoading(false)
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                setLoading(false)
            })
    }, [setLoading])

    useEffect(() => {
        updateData()
    }, [updateData])




    const submitOption = (addOption) => {
        const updatedOption = [...variants, { option: addOption, votes: 0 }]
        updateData(`/Polls/${findId}/Options.json`, updatedOption)
    }

    const sumbitVote = () => {
        // e.preventDefault()
        // ========doest update votes
        // const newVote = [...variants]
        // newVote.map(answer => {
        //     let option = answer.option
        //     let vote = answer.votes
        //     if (option === selected) {
        //         return { ...answer, votes: vote + 1 }
        //     }
        // })
        const total = totalVotes + 1
        // updateData(`/Polls/${findId}/Options.json`, newVote)
        updateData(`/Polls/${findId}/TotalVotes.json`, total)

        // =========== working with hardcored data
        setOptions(variants =>
            variants.map(answer =>
                answer.option === selected ? { ...answer, votes: answer.votes + 1, } : answer
            ))
        // setTotalVotes(totalVotes + 1)
    }


    const deleteOption = (idx) => {
        let newVariants = [...variants]
        newVariants.splice(idx, 1)
        updateData(`/Polls/${findId}/Options.json`, newVariants)
        // setVariant(newVariants)
    }

    const onReset = () => {
        // setVariant([])
        // setTotalVotes(0)
        updateData(`/Polls/${findId}/TotalVotes.json`, 0)
    }

    const handleSeceltedChange = (e) => {
        let selectedOption = e.target.value
        setSelected(selectedOption)

    }



    return (


        <div className="App">
            <LeftSection
                deleteOption={deleteOption}
                submitOption={submitOption}
                onReset={onReset}
                variants={variants && variants}
                question={question}
            />

            <MiddleSection
                handleSeceltedChange={handleSeceltedChange}
                sumbitVote={sumbitVote}
                question={question}
                variants={variants && variants}
            />

            <RightSection
                totalVotes={totalVotes}
                variants={options && options} />

        </div>

    )
}

export default Home;
