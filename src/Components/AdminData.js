import React, { useRef, useEffect, useCallback } from 'react'
import {
    FormHelperText,
    TextField, CardContent,
    Box, Card, CardHeader,
    Button, Typography,
    Grid, TableBody, TableCell, TableRow
} from '@material-ui/core';
import { Table } from 'react-bootstrap';


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
            className='btn-showdata'
            onClick={setVisible}
        >
            Show all Questions
        </Button>
    )
}

export const Cards = ({ variants, totalVotes, question }) => {
    const options = [...variants]
    const data = options.map(opt => opt.votes)

    const degsToRadians = (degs) => {
        return (degs / 360) * (2 * Math.PI)
    }

    const size = 120;
    const lineWidth = 60;

    const canvas = useRef(null);

    const draw = useCallback(() => {
        const colors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']
        const context = canvas.current.getContext("2d");
        context.save();
        const center = size / 2;
        const radius = center - (lineWidth / 2);
        const dataTotal = data.reduce((r, point) => r + point, 0)

        let startAngle = degsToRadians(-90);
        let colorIndex = 0;

        data.forEach(dataPoint => {
            const section = dataPoint / dataTotal * 360;
            const endAngle = startAngle + degsToRadians(section);
            const color = colors[colorIndex];
            colorIndex++;
            if (colorIndex >= colors.length) {
                colorIndex = 0;
            }

            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 20;
            context.arc(center, center, radius, startAngle, endAngle);
            context.stroke();
            startAngle = endAngle;

            context.font = '12px verdana';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            let midAngle = startAngle + (endAngle - startAngle) / 2;
            let labelRadius = radius * 0.75;
            let x = size + (labelRadius) * Math.cos(midAngle);
            let y = size + (labelRadius) * Math.sin(midAngle);
            context.fillStyle = 'white';
            context.fillText(data, x, y);
        })
    }, [data])



    useEffect(() => {
        draw()
    }, [draw])


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
                        <canvas ref={canvas}
                            height={size}
                            width={size}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}