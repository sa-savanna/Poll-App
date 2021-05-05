import React, { useContext } from 'react'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { DataContext } from "../../DataContext"


export const Variants = ({ handleChange }) => {
    
    const { variants } = useContext(DataContext);
    
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