import React, { useContext } from 'react'
import List from './Main/List'
import AddOption from './Main/AddOption'
import Summary from './Bottom/Summary';
import { DataContext } from "../../DataContext"



const LeftSection = ({ deleteOption, submitOption, onReset }) => {

    const { variants, question } = useContext(DataContext);

    return (
        <div className="left-section">
            <div className="left-main">
                <h1>{question}</h1>
                <ol>
                    {
                        variants && variants.map((variant, index) =>
                            <List key={index} list={variant.option} onDelete={() => deleteOption(index)} />
                        )
                    }
                </ol>
                {
                    variants && variants.length < 10 && (
                        <AddOption onSubmit={submitOption} />)
                }

            </div>
            <div className='left-bottom'>
                <Summary reset={onReset} variants={variants} />
            </div>
        </div>
    )
}

export default LeftSection
