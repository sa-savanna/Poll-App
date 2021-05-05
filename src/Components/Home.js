import React, { useEffect, useState, useCallback, useContext } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';
import axios from '../axios'
import { DataContext } from "../DataContext"



const Home = () => {

    const { variants, setVariant,
        totalVotes, setTotalVotes,
        setLoading } = useContext(DataContext);

    const [selected, setSelected] = useState("")

    const postData = useCallback((route, id) => {
        axios.post(`${route}`, id)
            .then(response => {
                console.log("Successfuly")
                setLoading(false)
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                setLoading(false)
            })
    }, [setLoading])

    useEffect(() => {
        postData()
    }, [postData])


    const submitOption = (addOption) => {
        const updatedOptions = [...variants, { option: addOption, votes: 0 }]
        // const updatedOptions = variants.push([...variants,{ option: addOption }])
        // setVariant(updatedOptions)
        postData("/Polls/Options.json", updatedOptions)

        setVariant('')
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
        setSelected(false)
    }


    return (
        <div className="App">
            <LeftSection
                deleteOption={deleteOption}
                submitOption={submitOption}
                onReset={onReset}
            />

            <MiddleSection
                handleSeceltedChange={handleSeceltedChange}
                sumbitVote={sumbitVote}
            />

            <RightSection />

        </div>
    );
}

export default Home;
