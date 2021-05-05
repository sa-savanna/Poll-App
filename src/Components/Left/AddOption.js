import React, { useState} from 'react';
import { Form } from "react-bootstrap"
import { Button } from '@material-ui/core';


const AddOption = ({ onSubmit, variants }) => {

    const [inputText, setInputText] = useState("")
    
    const options = variants.map(opt => opt.option)

    const submitHandler = event => {
        event.preventDefault();
        !options.includes(inputText) && inputText !== "" && onSubmit(inputText)
        setInputText("")
    }


    return (
        <Form>
            <Form.Control
                className="first-form"
                type="text"
                name="text"
                placeholder="Enter your option"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
            />{' '}
            <Button size='small' type="submit" variant="outlined" onClick={submitHandler}>Add</Button>
        </Form>

    )
}

export default AddOption
