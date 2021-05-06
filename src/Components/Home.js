import React, { useState, useContext, useEffect, useCallback } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';
import { DataContext } from "../DataContext"
import axios from '../axios'

const Home = () => {

    const { question, totalVotes, variants, setLoading, findId } = useContext(DataContext);

    const [selected, setSelected] = useState("")
    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions([...variants])
    }, [setOptions])


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


    const deleteData = useCallback(() => {
        setLoading(true)
        axios.delete(`/Polls/${findId}.json`)
            .then(res => {
                console.log("Successfuly")
                setLoading(false)
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                setLoading(false)
            })
    }, [setLoading])



    const submitOption = (addOption) => {
        const updatedOption = [...variants, { option: addOption, votes: 0 }]
        updateData(`/Polls/${findId}/Options.json`, updatedOption)
    }

    const sumbitVote = () => {
        // ========doest update votes
        // const newVote = [...variants]
        // newVote.map(answer => {
        //     let option = answer.option
        //     let vote = answer.votes
        //     if (option === selected) {
        //         return { ...answer, votes: vote + 1 }
        //     }
        // })

        // updateData(`/Polls/${findId}/Options.json`, newVote)
        const total = totalVotes + 1
        updateData(`/Polls/${findId}/TotalVotes.json`, total)

        // =========== working with hardcored data
        setOptions(variants =>
            variants.map(answer =>
                answer.option === selected ? { ...answer, votes: answer.votes + 1, } : answer
            ))
    }


    const deleteOption = (idx) => {
        let newVariants = [...variants]
        newVariants.splice(idx, 1)
        updateData(`/Polls/${findId}/Options.json`, newVariants)
    }

    const onReset = () => {
        deleteData()
    }

    const handleSeceltedChange = (e) => {
        let selectedOption = e.target.value
        setSelected(selectedOption)

    }



    return (

        <div className="Home">
            <LeftSection
                deleteOption={deleteOption}
                submitOption={submitOption}
                onReset={onReset}
                variants={variants && variants}
                question={question && question}
            />

            <MiddleSection
                handleSeceltedChange={handleSeceltedChange}
                sumbitVote={sumbitVote}
                question={question && question}
                variants={variants && variants}
            />

            <RightSection
                totalVotes={totalVotes && totalVotes}
                variants={options && options} />
        </div>

    )
}

export default Home;
