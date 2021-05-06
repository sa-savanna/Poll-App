import React, { useState, createContext, useEffect } from 'react'
import axios from "./axios"

export const DataContext = createContext();

const DataProvider = props => {

    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState("")
    const [totalVotes, setTotalVotes] = useState(0)
    const [variants, setVariant] = useState([])
    const [findId, setId] = useState("")


    useEffect(() => {
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


    return (
        <DataContext.Provider
            value={{
                variants, setVariant,
                totalVotes,
                question,
                loading, setLoading,
                findId
            }}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataProvider
