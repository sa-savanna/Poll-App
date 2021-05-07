import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
    FormControl, FormHelperText,
    TextField, CardContent,
    Box, Card, CardHeader, Divider,
    Container, Button,
    Grid, Typography,
} from '@material-ui/core';
import axios from '../axios'
import { useHistory } from "react-router-dom";
import { DataContext } from "../DataContext"
import { PollQuestion, Inputs, GroupButtons, CreatePoll, ShowData, Cards } from './AdminData';

const Admin = () => {

    const { loading, setLoading,
        variants, totalVotes, question
    } = useContext(DataContext);

    let history = useHistory();
    const [pollQuestion, setpollQuestion] = useState("")
    const [options, setOptions] = useState([
        { option: 'opt1', votes: 0 },
        { option: 'opt2', votes: 0 },
    ])
    const [visible, setVisible] = useState(false)

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
        setpollQuestion(event.target.value);
    };


    const handleOptions = (i, event) => {
        const { value } = event.target;
        let newOptions = [...options]
        newOptions[i].option = value;
        setOptions(newOptions)
    };


    const addField = () => {
        setOptions([...options, { option: "", votes: 0 }]);
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
        for (let el in options) {
            let option = options[el].option
            let votes = options[el].votes
            formOptions[el] = { option: option, votes: votes }
        }
        const pollpollQuestion = {
            pollQuestion: pollQuestion,
            TotalVotes: 0,
            Options: formOptions
        }
        postData(pollpollQuestion)
        setpollQuestion('')
        setOptions([...options, { option: '', votes: 0 }])
        alert("Information submited")
        history.push("/")
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xl={8} lg={8} sm={8} xs={12}>
                    <FormControl style={{ margin: '1em' }}>
                        <Card>
                            <CardHeader
                                title="Create your New Poll"
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    {pollQuestion.length < 80 &&
                                        <PollQuestion handleTitle={handleTitle} pollQuestion={pollQuestion} />
                                    }
                                    {
                                        options.map((option, i) =>
                                            <Inputs key={i}
                                                label={"Poll option " + (i + 1)}
                                                name={"option " + (i + 1)}
                                                value={option[i]}
                                                onChange={(e) => handleOptions(i, e)}
                                            />
                                        )
                                    }
                                    <GroupButtons addField={addField} removeField={removeField} />
                                </Grid>
                            </CardContent>
                            <Divider />

                            <CreatePoll submitPoll={submitPoll} loading={loading} />

                        </Card>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xl={8} lg={8} sm={8} xs={12}>
                    <ShowData submitPoll={submitPoll} setVisible={setVisible} />
                    {
                        visible &&
                        <div className='statistic'>
                            <Cards variants={variants} totalVotes={totalVotes} question ={question}/>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Admin
