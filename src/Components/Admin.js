import React, { useEffect, useState, useContext } from 'react'
import {
    FormControl, FormHelperText,
    TextField, CardContent,
    Box, Card, CardHeader, Divider,
    Container, Button,
    Grid
} from '@material-ui/core';
// import firebase from '../firebase';
import axios from '../axios'
import { DataContext } from "../DataContext"



const Admin = () => {

    const { variants, setVariant,
        question, setQuestion,
        totalVotes,
        loading, setLoading } = useContext(DataContext);

    const [options, setOptions] = useState([
        { option: '', votes: 0 },
        { option: '', votes: 0 },
    ])

    useEffect(() => {
        setVariant(variants)
    }, [variants, setVariant])



    const handleTitle = (event) => {
        setQuestion(event.target.value);
    };

    const handleOptions = (event, i) => {
        let newOptions = [...variants]
        newOptions[i].option = event.target.value

        setVariant(prev => ({ ...prev, option: newOptions, votes: 0 }))
    };


    const addField = () => {
        setOptions([...options, { option: "", vote: 0 }]);
    }

    const removeField = (i) => {
        const newOptions = [...options];
        newOptions.splice(i, 1);
        setOptions(newOptions);
    }

    const submitPoll = (e) => {
        e.preventDefault()
        setLoading(true)
        let formOptions = {}
        for (let el in variants) {
            formOptions[el] = variants[el].value
        }
        const pollQuestion = {
            Question: question,
            TotalVotes: totalVotes,
            Options: formOptions
        }

        axios.post(`/Polls.json`, pollQuestion)
            .then(response => {
                console.log("Successfuly")
                setLoading(false)
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                setLoading(false)
            })
        setQuestion('')
    }


    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 7,
                mt: 5
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                >
                    <FormControl>
                        <Card>
                            <CardHeader
                                title="Create your New Poll"
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xl={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            name="title"
                                            onChange={handleTitle}
                                            required
                                            value={question}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    {

                                        !loading && variants.map((opt, i) => {
                                            return (
                                                <Grid item xl={12} xs={12} key={i} >
                                                    <TextField
                                                        fullWidth
                                                        label={"Poll option " + (i + 1)}
                                                        name={"option " + (i + 1)}
                                                        onChange={(e) => handleOptions(e, i)}
                                                        required
                                                        value={opt.option}
                                                        variant="outlined"
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
                                    p: 2
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
            </Container>
        </Box>
    )
}

export default Admin