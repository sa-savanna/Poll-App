import React from 'react'
import {
    FormControl, FormHelperText,
    TextField, CardContent,
    Box, Card, CardHeader, Divider,
    Container, Button,
    Grid, Typography,
} from '@material-ui/core';



export const PollQuestion = ({ handleTitle, pollQuestion }) => {
    return (
        <Grid item xl={12} xs={12}>
            <TextField
                fullWidth
                className='inputs-admin'
                label="Title"
                name="title"
                onChange={handleTitle}
                required
                value={pollQuestion}
                variant="outlined"
                helperText={`${pollQuestion.length}/80`}
            />
        </Grid>
    )
}

export const Inputs = ({ onChange, value, label, name }) => {
    return (
        <Grid item xl={12} xs={12}>
            <TextField
                fullWidth
                className='inputs-admin'
                label={label}
                name={name}
                onChange={onChange}
                required
                value={value}
                variant="outlined"
                inputProps={{ maxLength: 80 }}
            />
        </Grid>
    )
}

export const GroupButtons = ({ addField, removeField }) => {
    return (
        <Grid item xl={12} xs={12} className='btn-admin-plusminus'>
            <FormHelperText>Add more options</FormHelperText>
            <Button color="secondary" variant="contained" onClick={addField}>+</Button>
            <Button color="primary" variant="contained" onClick={removeField}>-</Button>
        </Grid>
    )
}


export const CreatePoll = ({ loading, submitPoll }) => {
    return (
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
                className='btn-create-poll'
            >
                Create Poll
            </Button>

        </Box>
    )
}

export const ShowData = ({ setVisible, submitPoll }) => {
    return (
        <Button
            color="default"
            variant="contained"
            onClick={submitPoll}
            className='btn-showdata'
            onClick={() => setVisible(true)}
        >
            Show all Questions
        </Button>
    )
}

export const Cards = ({ variants, totalVotes, question }) => {
    return (
        <Card >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item id="article">
                        <Typography variant="h5" component="h3">
                            {question}
                        </Typography>
                        {
                            variants && variants.map(opt =>
                                <>
                                    <Typography>
                                       Options:  {opt.option}
                                    </Typography>
                                    <Typography color="textSecondary">
                                       Votes: {opt.votes}
                                    </Typography>
                                </>
                            )
                        }
                        <Typography variant="h6" color='secondary'>
                            Total votes: {totalVotes}
                        </Typography>
                    </Grid>
                    <Grid item id="chart"></Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

