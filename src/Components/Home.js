import React, { useContext } from 'react';
import LeftSection from './Left/LeftSection';
import MiddleSection from './Middle/MiddleSection';
import RightSection from './Right/RightSection';
import { DataContext } from "../DataContext"


const Home = () => {

    const {
        submitOption,
        deleteOption,
        onReset,
        sumbitVote,
        handleSeceltedChange,
        question,
        totalVotes,
        variants
    } = useContext(DataContext);


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
