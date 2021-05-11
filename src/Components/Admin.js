import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
    FormControl,
    CardContent,
    Card, CardHeader, Divider,
    Container,
    Grid,
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
    const [pollQuestion, setPollQuestion] = useState("")
    const [options, setOptions] = useState([
        { option: '', votes: 0 },
        { option: '', votes: 0 },
    ])
    const [visible, setVisible] = useState(false)

    const postData = useCallback((data) => {
        axios.post(`/Polls.json`, data)
            .then(response => {
                console.log("Successfuly", response)
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
        setPollQuestion(event.target.value);
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
        // console.log(formOptions)
        postData(pollpollQuestion)
        setPollQuestion('')
        setOptions([...options, { option: '', votes: 0 }])
        alert("Information submited")
        history.push("/")
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xl={8} lg={8} sm={8} xs={12}>
                    <FormControl noValidate style={{ margin: '1em' }}>
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
                <Grid item xs={12}>
                    <ShowData submitPoll={submitPoll} setVisible={() => setVisible(true)} />
                    {
                        visible &&
                        <div className='statistic'>
                            <Grid
                                container
                                spacing={3}
                                sx={{ justifyContent: 'space-between' }}
                            >
                                <Cards variants={variants} totalVotes={totalVotes} question={question} />
                            </Grid>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Admin
