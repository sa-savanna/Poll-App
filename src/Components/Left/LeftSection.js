import React from 'react'
import List from './List'
import AddOption from './AddOption'
import Summary from './Summary';


const LeftSection = ({ deleteOption, submitOption, onReset, variants, question }) => {


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
                        <AddOption onSubmit={submitOption} variants={variants} />)
                }

            </div>
            <div className='left-footer'>
                <Summary reset={onReset} variants={variants} />
            </div>
        </div>
    )
}

export default LeftSection
