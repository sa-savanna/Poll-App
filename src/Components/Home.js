import React, { useState, useContext, useEffect, useCallback } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';
import { DataContext } from "../DataContext"
import axios from '../axios'


const Home = () => {

    const { question, setQuestion,
        totalVotes, setTotalVotes,
        variants, setVariant,
        setLoading, findId } = useContext(DataContext);

    const [selected, setSelected] = useState("")

    const updateData = useCallback((route, option) => {
        setLoading(true)
        axios.put(`${route}`, option)
            .then(res => {
                console.log(res.data)
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
                console.log(res.data)
                console.log("Successfuly")
                setLoading(false)
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                setLoading(false)
            })
    }, [setLoading, findId])


    const submitOption = (addOption) => {
        const updatedOption = [...variants, { option: addOption, votes: 0 }]
        setVariant(updatedOption)
        updateData(`/Polls/${findId}/Options.json`, updatedOption)
    }

    const sumbitVote = () => {

        setVariant(variants =>
            variants.map(answer =>
                answer.option === selected ? { ...answer, option: answer.option, votes: answer.votes++ } : answer))
        updateVotes()
        updateData(`/Polls/${findId}/Options.json`, variants)

        // =========== working with hardcored data
        // setVariants(variants =>
        //     variants.map(answer =>
        //         answer.option === selected ? { ...answer, votes: answer.votes + 1, } : answer
        //     ))
    }

    const updateVotes = () => {
        let sum = 0
        let newVotes = [...variants]
        for (let i in newVotes) {
            sum += newVotes[i].votes
        }
        setTotalVotes(sum)
        updateData(`/Polls/${findId}/TotalVotes.json`, sum)
    }

    const deleteOption = (idx) => {
        let newVariants = [...variants]
        newVariants.splice(idx, 1)
        setVariant(newVariants)
        updateData(`/Polls/${findId}/Options.json`, newVariants)
        // setTotalVotes(votes)
    }

    const onReset = () => {
        deleteData()
        setQuestion('')
        setTotalVotes(0)
        setVariant([])
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
                variants={variants && variants} />
        </div>

    )
}

export default Home;
