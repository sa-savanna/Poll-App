import React, { useState, createContext, useEffect, useCallback } from 'react'
import axios from "./axios"

export const DataContext = createContext();

const DataProvider = props => {

    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState("")
    const [totalVotes, setTotalVotes] = useState(0)
    const [variants, setVariant] = useState([])
    const [findId, setId] = useState("")
    const [selected, setSelected] = useState("")
    console.log(question);

    const fetchData = useCallback(() => {
        axios.get(`/Polls.json`)
            .then(res => {
                setLoading(true)
                const result = res.data
                for (let id in result) {
                    setQuestion(result[id].Question)
                    setTotalVotes(result[id].TotalVotes)
                    setVariant(result[id].Options)
                    setId(id)
                }
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const updateData = useCallback((route, option) => {
        setLoading(true)
        axios.put(`${route}`, option)
            .then(res => {
                console.log("Successfuly", res.data)
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
        axios.delete(`/Polls/${findId}.json`)
            .then(res => {
                console.log("Data deleted")
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



    const updateVotes = () => {
        let sum = 0
        let newVotes = [...variants]
        for (let i in newVotes) {
            sum += newVotes[i].votes
        }
        setTotalVotes(sum)
        updateData(`/Polls/${findId}/TotalVotes.json`, sum)
    }

    const sumbitVote = () => {
        setVariant(variants =>
            variants.map(answer =>
                answer.option === selected ? { ...answer, option: answer.option, votes: answer.votes++ } : answer))
        updateData(`/Polls/${findId}/Options.json`, variants)
        updateVotes()
    }

    const handleSeceltedChange = (e) => {
        let selectedOption = e.target.value
        setSelected(selectedOption)
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

    return (
        <DataContext.Provider
            value={{
                fetchData, updateData, deleteData,
                submitOption, updateVotes, deleteOption,
                onReset, sumbitVote, handleSeceltedChange,
                variants, setVariant,
                totalVotes, setTotalVotes,
                question, setQuestion,
                loading, setLoading,
                findId,
            }}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataProvider
