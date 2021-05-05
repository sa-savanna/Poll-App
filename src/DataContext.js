import React, { useState, createContext, useEffect, useCallback } from 'react'
import axios from "./axios"

export const DataContext = createContext();

const DataProvider = props => {

    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState("")
    const [totalVotes, setTotalVotes] = useState(0)
    const [variants, setVariant] = useState([])

    const getData = useCallback(() => {
        axios.get(`/Polls.json`)
            .then(res => {
                // console.log(res.data);
                // setLoading(true)
                setVariant(res.data.Options)
                setTotalVotes(res.data.TotalVotes)
                setQuestion(res.data.Question)
                // setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        setVariant(variants)
    }, [variants, setVariant])

    return (
        <DataContext.Provider
            value={{
                variants, setVariant,
                totalVotes, setTotalVotes,
                question, setQuestion,
                loading, setLoading
            }}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataProvider
