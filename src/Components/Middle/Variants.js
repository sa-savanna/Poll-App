import React from 'react'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'


export const Variants = ({ handleChange, variants }) => {


    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="option" name="name" onChange={handleChange}>
                {
                    variants && variants.map((variant, key) => (
                        <FormControlLabel key={key} value={variant.option} control={<Radio />} label={variant.option} />
                    ))
                }
            </RadioGroup>
        </FormControl >
    )
}


export default Variants