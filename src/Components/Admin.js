import React, { useState, useEffect, useCallback } from 'react'
import {
    FormControl, FormHelperText,
    TextField, CardContent,
    Box, Card, CardHeader, Divider,
    Container, Button,
    Grid
} from '@material-ui/core';
import axios from '../axios'


const Admin = () => {

    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState("")
    const [variants, setVariant] = useState([
        { option: 'opt1', votes: 0 },
        { option: 'opt2', votes: 0 },
    ])
    const [maxLength, setMaxLength] = useState(80)

    const postData = useCallback((data) => {
        axios.post(`/Polls.json`, data)
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

    const handleTitle = (event) => {
        setQuestion(event.target.value);
    };


    const handleOptions = (i, event) => {
        const { value } = event.target;
        let newOptions = [...variants]
        newOptions[i].option = value;
        setVariant(newOptions)
    };


    const addField = () => {
        setVariant([...variants, { option: "", votes: 0 }]);
    }

    const removeField = (i) => {
        const newOptions = [...variants];
        newOptions.splice(i, 1);
        setVariant(newOptions);
    }

    const submitPoll = (e) => {
        e.preventDefault()
        setLoading(true)
        let formOptions = {}
        for (let el in variants) {
            let option = variants[el].option
            let votes = variants[el].votes
            formOptions[el] = { option: option, votes: votes }
        }
        const pollQuestion = {
            Question: question,
            TotalVotes: 0,
            Options: formOptions
        }
        postData(pollQuestion)
        setQuestion('')
        setVariant([...variants, { option: '', votes: 0 }])
    }


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xl={8} xs={8}>
                    <FormControl style={{ margin: '2em' }}>
                        <Card>
                            <CardHeader
                                title="Create your New Poll"
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    {question.length < maxLength &&
                                        <Grid item xl={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Title"
                                                name="title"
                                                onChange={handleTitle}
                                                required
                                                value={question}
                                                variant="outlined"
                                                helperText={`${question.length}/80`}
                                            />
                                        </Grid>
                                    }
                                    {
                                        variants.map((option, i) => {
                                            return (
                                                <Grid item xl={12} xs={12} key={i}>
                                                    <TextField
                                                        fullWidth
                                                        label={"Poll option " + (i + 1)}
                                                        name={"option " + (i + 1)}
                                                        onChange={(e) => handleOptions(i, e)}
                                                        required
                                                        value={option[i]}
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 80 }}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                    <Grid item xl={12} xs={12} >
                                        <FormHelperText>Add more options</FormHelperText>
                                        <Button color="secondary" variant="contained" onClick={addField}>+</Button>
                                        <Button color="primary" variant="contained" onClick={removeField}>-</Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 3
                                }}
                            >
                                <Button
                                    style={{ background: loading && "#ccc" }}
                                    color="default"
                                    variant="contained"
                                    type="submit"
                                    onClick={submitPoll}
                                >
                                    Create Poll
                                </Button>
                            </Box>
                        </Card>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Admin
