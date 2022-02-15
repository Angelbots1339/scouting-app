import {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton, makeStyles,
    Paper,
    Switch,
    Typography,
    TextField, MenuItem, Select, FormHelperText, InputLabel, FormControl
} from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Field} from "formik";


const GameForm = () => {
    //-----Cycles------
    const [cargoShotHigh, setCargoShotHigh] = useState(0);
    const [cargoShotLow, setCargoShotLow] = useState(0);
    const [cargoScoredHigh, setCargoScoredHigh] = useState(0);
    const [cargoScoredLow, setCargoScoredLow] = useState(0);

    const [cycleList, setCycleList] = useState([])
    const addCycleTime = () => {
        setCycleList([...cycleList, {
            cycleTime: cycleTime,
            HighGoal: false,
            cargoShot: 1,
            cargoScored: 1
        }])
        setCargoShotLow(cargoShotLow + 1);
        setCargoScoredLow(cargoScoredLow + 1);
    }
    const updateCycleTime = (index, newList) => {
        let previousCycle = cycleList[index];
        let currentCycle = newList[index];
        if (currentCycle.HighGoal) {
            if (!previousCycle.HighGoal) {
                setCargoShotLow(cargoShotLow - previousCycle.cargoShot);
                setCargoScoredLow(cargoScoredLow - previousCycle.cargoScored);

                setCargoShotHigh(cargoShotHigh + previousCycle.cargoShot);
                setCargoScoredHigh(cargoScoredHigh + previousCycle.cargoScored);
            } else {
                setCargoShotHigh(cargoShotHigh + (currentCycle.cargoShot - previousCycle.cargoShot));
                setCargoScoredHigh(cargoScoredHigh + (currentCycle.cargoScored - previousCycle.cargoScored));
            }
        } else {
            if (previousCycle.HighGoal) {
                setCargoShotHigh(cargoShotHigh - previousCycle.cargoShot);
                setCargoScoredHigh(cargoScoredHigh - previousCycle.cargoScored);

                setCargoShotLow(cargoShotLow + previousCycle.cargoShot);
                setCargoScoredLow(cargoScoredLow + previousCycle.cargoScored);
            } else {
                setCargoShotLow(cargoShotLow + (currentCycle.cargoShot - previousCycle.cargoShot));
                setCargoScoredLow(cargoScoredLow + (currentCycle.cargoScored - previousCycle.cargoScored));
            }
        }
        setCycleList(newList);
    }

    const onChangeCycleHighGoal = index => event => {
        let cycleTimes = JSON.parse(JSON.stringify(cycleList));
        cycleTimes[index].HighGoal = event.target.checked;
        updateCycleTime(index, cycleTimes);
    }

    const onChangeCycleCargoShot = index => event => {

        let cycleTimes = JSON.parse(JSON.stringify(cycleList));
        cycleTimes[index].cargoShot = event.target.checked ? 2 : 1;
        updateCycleTime(index, cycleTimes);
    }
    const onChangeCycleCargoScored = index => event => {
        let cycleTimes = JSON.parse(JSON.stringify(cycleList));
        cycleTimes[index].cargoScored = event.target.checked ? 2 : 1;
        updateCycleTime(index, cycleTimes);
    }
    const onRemoveCycle = index => event => {
        let cycleTimes = JSON.parse(JSON.stringify(cycleList));
        cycleTimes[index].cargoScored = 0;
        cycleTimes[index].cargoShot = 0;
        updateCycleTime(index, cycleTimes);
        setCycleList(cycleList.filter((item, i) => i !== index))
    }


    const cycleComponent = (datum, index) => {
        return (
            <Paper sx={{p: 0.5, m: 0.5}} key={index}>
                <Grid>
                    <FormControlLabel control={<Switch/>} label={"Two Shot"} checked={datum.cargoShot === 2}
                                      onChange={onChangeCycleCargoShot(index)}/>

                    <FormControlLabel control={<Switch/>} disabled={datum.cargoShot !== 2} label={"Two Made"}
                                      checked={datum.cargoScored === 2}
                                      onChange={onChangeCycleCargoScored(index)}/>

                    <FormControlLabel control={<Switch/>} label={"Upper"} checked={datum.HighGoal}
                                      onChange={onChangeCycleHighGoal(index)}/>

                    <Typography display={"inline"}>
                        Time: {formatTime(datum.cycleTime)}
                    </Typography>

                    <IconButton onClick={onRemoveCycle(index)}>
                        <RemoveIcon/>
                    </IconButton>
                </Grid>
            </Paper>
        )
    }


    // ---------Timer-----------
    const [cycleTime, setCycleTime] = useState(0);
    const [isTimerStart, setIsTimerStart] = useState(false);

    React.useEffect(() => {
            let interval = null;
            if (isTimerStart) {
                interval = setInterval(() => {
                    setCycleTime(time => time + 10)
                }, 10);
            } else {
                clearInterval(interval);
            }

            return () => clearInterval(interval)
        },
        [isTimerStart])

    const ScoreCounter = (props) => {

        const onAdd = () => {
            if (!props.maxValue) {
                props.setScore(props.value + 1);
            } else {
                if (props.value < props.maxValue) {
                    props.setScore(props.value + 1);
                }
            }

        }
        const onMinus = () => {
            if (props.value > props.cycleValue) {
                props.setScore(props.value - 1);
            }
        }

        return (<Grid item>
            <Paper sx={{
                height: 70,
                width: 120, p: 0.1, m: 0.3
            }}>
                <Typography display={"inline"} variant={"subtitle1"}>{`${props.name}: ${props.value}`}</Typography>
                <Grid container>
                    <IconButton onClick={onAdd}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton onClick={onMinus}>
                        <RemoveIcon/>
                    </IconButton>
                </Grid>
            </Paper>
        </Grid>);
    }

    const formatTime = (Time) => {
        const getMiliSecons = ("0" + ((Time / 10) % 100)).slice(-2);
        const getSeconds = ("0" + Math.floor((Time / 1000) % 60)).slice(-2);
        const getMinutes = ("0" + Math.floor((Time / 60000) % 60)).slice(-2);
        return `${getMinutes}:${getSeconds}:${getMiliSecons}`
    }

    const onClickStart = () => {
        if (isTimerStart) {
            addCycleTime();
            setCycleTime(0);
            setIsTimerStart(false);
        } else {
            setIsTimerStart(true)
        }
    }
    //------Form------
    const [isDefultClimb, setIsDefultClimb] = useState(true);
    const handleSubmit = () => {
        const values =
            {
                cycles: [...cycleList],
                cargoShotLow,
                cargoShotHigh,
                cargoScoredLow,
                cargoScoredHigh
            }
        alert(JSON.stringify(values, null, 2))
    }
    const onChangeIsDefaultClimb = (Event) => {
      setIsDefultClimb(Event.target.checked);
    }


    //-----JSX-----
    return (
        <div>
            <Paper sx={{m: 1, p: 1}}>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <div>
                            <Typography variant={"h4"}> 1339</Typography>
                            <Paper elevation={4} sx={{p: 1}}>
                                {cycleList.map(cycleComponent)}

                            </Paper>
                            <Button onClick={onClickStart} variant={"contained"} sx={{m: 0.25}}>
                                {isTimerStart ? "Add" : "Start"}
                            </Button>
                            <Button sx={{m: 0.25}} variant={"contained"} onClick={() => {
                                setCycleTime(0);
                                setIsTimerStart(false);
                            }}>Reset</Button>
                            <Typography display={"inline"}>Time: {formatTime(cycleTime)}</Typography>
                        </div>
                    </FormGroup>

                    <Grid container>
                        <ScoreCounter name={"Shot High"} value={cargoShotHigh} setScore={setCargoShotHigh}
                                      cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                          return acc + (current.HighGoal ? current.cargoShot : 0);
                                      }, 0) : 0}/>
                        <ScoreCounter maxValue={cargoShotHigh} name={"Scored High"} value={cargoScoredHigh}
                                      setScore={setCargoScoredHigh}
                                      cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                          return acc + (current.HighGoal ? current.cargoScored : 0);
                                      }, 0) : 0}/>
                        <ScoreCounter name={"Shot low"} value={cargoShotLow} setScore={setCargoShotLow}
                                      cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                          return acc + (!current.HighGoal ? current.cargoShot : 0);
                                      }, 0) : 0}/>
                        <ScoreCounter maxValue={cargoShotLow} name={"Scored low"} value={cargoScoredLow}
                                      setScore={setCargoScoredLow}
                                      cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                          return acc + (!current.HighGoal ? current.cargoScored : 0);
                                      }, 0) : 0}/>
                    </Grid>
                    <FormGroup>

                        <FormControlLabel control={<Checkbox  checked={isDefultClimb}/>} label={"Climbed: Loading..."} onChange={onChangeIsDefaultClimb}/>
                        {!isDefultClimb &&
                            <FormControl variant={"standard"}>
                            <InputLabel id="climb-label">Climb</InputLabel>
                            <Select
                                labelId="climb-label"
                                id="Climb"
                                label="Age"
                            >
                                <MenuItem value="None">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Select Climb</FormHelperText>
                        </FormControl>}
                        <TextField
                            name="notes"
                            type="text"
                            label="Notes"
                            margin={"normal"}
                            multiline
                            maxRows={4}
                        />

                        <TextField
                            name="redFlags"
                            type="text"
                            label="RedFlags"
                            margin={"normal"}
                            multiline
                            maxRows={4}
                        />
                    </FormGroup>
                    <Button type={"submit"}>Ready</Button>
                </form>

            </Paper>
        </div>
    )
}
export default GameForm