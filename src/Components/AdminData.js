import React from 'react'
import {
    FormHelperText, FormControl,
    TextField, CardContent,
    Box, Card, CardHeader,
    Button, Typography,
    Grid, Table, TableBody, TableCell, TableRow
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';



export const PollQuestion = ({ handleTitle, error, pollQuestion }) => {
    return (
        <Grid item xl={12} xs={12}>
            <TextField
                // {...(error && { error: true, helperText: error })}
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

export const Inputs = ({ onChange, value, error, label, name }) => {
    return (
        <Grid item xl={12} xs={12}>
            <FormControl {...(error && { error: true })}>
                <TextField
                    required
                    fullWidth
                    className='inputs-admin'
                    label={label}
                    name={name}
                    onChange={onChange}
                    value={value}
                    variant="outlined"
                    inputProps={{ maxLength: 80 }}

                />
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
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


export const CreatePoll = ({ loading, submitPoll, disabled }) => {
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
                disabled={disabled}
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
            className='btn-showdata'
            onClick={setVisible}
        >
            Show all Questions
        </Button>
    )
}

export const Cards = ({ variants, totalVotes, question }) => {
    const dataOptions = [...variants]
    let data = []
    let labels = []
    const size = 120
    const colors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']

    dataOptions.map(opt => (
        data.push(opt.votes)
    ))

    const dataSet = {
        maintainAspectRatio: false,
        responsive: false,
        labels: false,
        datasets: [
            {
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    };

    const options = {
        legend: {
            display: false
        },
        elements: {
            arc: {
                borderWidth: 1
            }
        },
        tooltips: {
            callbacks: {
                label: function () {
                    dataOptions.map(opt => (
                        labels.push(opt.option)
                    ))
                    return labels;
                }
            }
        }
    };



    return (
        <Card>
            <CardHeader title={question}></CardHeader>
            <CardContent>
                <Grid
                    container
                    direction='row'
                    spacing={3}
                    justify="space-between"
                >
                    <Grid item id="article">
                        <Table>
                            <TableBody>
                                {
                                    variants && variants.map(opt =>
                                        <TableRow key={opt.option}>
                                            <TableCell>Option:  {opt.option}</TableCell>
                                            <TableCell>Votes: {opt.votes}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        <Typography variant="h6" color='secondary'>
                            Total votes: {totalVotes}
                        </Typography>
                    </Grid>
                    <Grid item id="chart">
                        <Doughnut
                            data={dataSet}
                            options={options}
                            width={size}
                            height={size}
                        />

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}