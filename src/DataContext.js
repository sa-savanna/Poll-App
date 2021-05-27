import React, { useState, createContext, useEffect, useCallback } from 'react'
import axios from "./axios"

export const DataContext = createContext();


const initialState = {
    id: 0,
    question: "What is the value of PI",
    variants: [
        { option: "3.1416", votes: 3 },
        { option: "3.15", votes: 5 },
        { option: "3.14", votes: 8 }
    ],
    totalVotes: 16
}


const DataProvider = props => {

    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState(initialState.question)
    const [totalVotes, setTotalVotes] = useState(initialState.totalVotes)
    const [variants, setVariant] = useState(initialState.variants)
    const [findId, setId] = useState(initialState.id)
    const [selected, setSelected] = useState("")
    const [allData, setFetchedData] = useState([])
    // console.log(allData);
    const fetchData = useCallback(() => {
        axios.get(`/Polls.json`)
            .then(res => {
                setLoading(true)
                const result = res.data
                // console.log(typeof(result))
                for (let id in result) {
                    setQuestion(result[id].Question)
                    setTotalVotes(result[id].TotalVotes)
                    setVariant(result[id].Options)
                    setId(id)
                    setFetchedData(Object.values(result))
                    
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
        if (findId !== initialState.id) {
            updateData(`/Polls/${findId}/Options.json`, updatedOption)
        }
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
        let newVar = [...variants]
        newVar.map(answer => answer.option === selected ?
            { ...answer, option: answer.option, votes: answer.votes++ } : answer)
        setVariant(newVar)
        if (findId !== initialState.id) {
            updateData(`/Polls/${findId}/Options.json`, newVar);
            updateVotes()
        }
    }

    const handleSeceltedChange = (e) => {
        let selectedOption = e.target.value
        setSelected(selectedOption)
    }

    const deleteOption = (idx) => {
        let newVariants = [...variants]
        const votes = newVariants[idx].votes
        let divition = totalVotes - votes
        setTotalVotes(divition)
        updateData(`/Polls/${findId}/TotalVotes.json`, divition)
        newVariants.splice(idx, 1)
        setVariant(newVariants)
        updateData(`/Polls/${findId}/Options.json`, newVariants)
    }

    const onReset = () => {
        // deleteData()
        setQuestion(initialState.question)
        setTotalVotes(initialState.totalVotes)
        setVariant(initialState.variants)
        setId(initialState.id)
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
                findId, allData,
            }}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataProvider
