import { useReducer, useState } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton, Paper,
    Switch,
    Typography,
    TextField, MenuItem, Select, FormHelperText, FormControl
} from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import TeamDataService from "../../services/team";



const GameForm = () => {
    //-----Cycles------
    const [cargoShotHigh, setCargoShotHigh] = useState(0);
    const [cargoShotLow, setCargoShotLow] = useState(0);
    const [cargoScoredHigh, setCargoScoredHigh] = useState(0);
    const [cargoScoredLow, setCargoScoredLow] = useState(0);

    const stateReducer = (state, action) => ({
        ...state,
        ...(typeof action === 'function' ? action(state) : action),
    });
    const [auto, setAuto] = useReducer(stateReducer, { cargoHigh: 0, cargoLow: 0, offline: false })
    const [climb, setClimb] = useState(0);
    const [notes, setNotes] = useState("");
    const [brokeDown, setBrokeDown] = useState(false);
    const [teamNumber, setTeamNumber] = useState(0);

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
    const onRemoveCycle = index => () => {
        let cycleTimes = JSON.parse(JSON.stringify(cycleList));
        cycleTimes[index].cargoScored = 0;
        cycleTimes[index].cargoShot = 0;
        updateCycleTime(index, cycleTimes);
        setCycleList(cycleList.filter((item, i) => i !== index))
    }


    const cycleComponent = (datum, index) => {
        return (

            <Paper sx={{ p: 0.5, m: 0.5 }} key={index}>
                <Grid>
                    <FormControlLabel control={<Switch />} label={"Two Shot"} checked={datum.cargoShot === 2}
                        onChange={onChangeCycleCargoShot(index)} />

                    <FormControlLabel control={<Switch />} disabled={datum.cargoShot !== 2} label={"Two Made"}
                        checked={datum.cargoScored === 2}
                        onChange={onChangeCycleCargoScored(index)} />

                    <FormControlLabel control={<Switch />} label={"Upper"} checked={datum.HighGoal}
                        onChange={onChangeCycleHighGoal(index)} />

                    <Typography display={"inline"}>
                        Time: {formatTime(datum.cycleTime)}
                    </Typography>

                    <IconButton onClick={onRemoveCycle(index)}>
                        <RemoveIcon />
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
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={onMinus}>
                        <RemoveIcon />
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


    const [teams, setTeams] = useState([]);
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
    // const [isDefultClimb, setIsDefultClimb] = useState(true);
    const handleSubmit = () => {


        const values =
        {
            cycles: [...cycleList],
            cargoShotLow,
            cargoShotHigh,
            cargoScoredLow,
            cargoScoredHigh,
            notes,
            brokeDown,
            auto,
            climb
        }


        TeamDataService.getAllTeams().then(res => {
            setTeams(res.data.map((team) => team._id))
        })

        if (!teams.includes(teamNumber)) {
            TeamDataService.addTeam(teamNumber);
        }
        TeamDataService.addGame(teamNumber, values).then((data) => console.log(data));




        setTeamNumber(0)
        setCargoScoredHigh(0)
        setCargoScoredLow(0)
        setCargoShotHigh(0)
        setCargoShotLow(0)
        setAuto({ cargoHigh: 0, cargoLow: 0, offline: false })
        setClimb(0)
        setNotes("")
        setCycleList([])
        setIsTimerStart(false)

    }
    //-----JSX-----
    return (
        <Paper sx={{ marginTop: 15}}>
            <div>
                <Paper sx={{ m: 1, p: 1}}>
                    <form>
                        <FormGroup sx={{ paddingLeft: 10, paddingTop: 8, marginRight:10 }}>
                            <div>
                                <TextField name={`Team`} type="number"
                                    label="Team Number"
                                    margin={"normal"}
                                    inputProps={{ min: 0, max: 9999 }}
                                    value={teamNumber}
                                    onChange={e => setTeamNumber(e.target.value)}
                                />




                                <div>
                                    <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey" />
                                </div>
                                <Typography variant={"h6"} sx={{ marginTop: 5 }}> Auto</Typography>

                                <FormGroup>
                                    <TextField name={`cargoLow`} type="number"
                                        label="Cargo Low"
                                        margin={"normal"}
                                        inputProps={{ min: 0, max: 5 }}
                                        value={auto.cargoLow}
                                        onChange={e => setAuto({ cargoLow: e.target.value })}
                                    />

                                    <TextField name={`cargoHigh`} type="number"
                                        label="Cargo High"
                                        margin={"normal"}
                                        inputProps={{ min: 0, max: 5 }}
                                        value={auto.cargoHigh}
                                        onChange={e => setAuto({ cargoHigh: e.target.value })} />
                                    <FormControlLabel
                                        control={
                                            <Checkbox type="checkbox" name={`offLine`} value={auto.offLine}
                                                onChange={e => setAuto({ offline: e.target.checked })} />
                                        }
                                        label="Off Start Line"
                                    />

                                </FormGroup>


                                <div>
                                    <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey" />
                                </div>

                                <Typography variant={"h6"} sx={{ paddingTop: 2, paddingBottom: 2 }}> Cycles</Typography>
                                <Paper elevation={4} sx={{ p: 1 }}>
                                    {cycleList.map(cycleComponent)}

                                </Paper>
                                <Typography sx={{ marginTop: 5 }}>Time: {formatTime(cycleTime)}</Typography>
                                <Button onClick={onClickStart} variant={"contained"} sx={{ marginTop: 1 }}>
                                    {isTimerStart ? "Add" : "Start"}
                                </Button>
                                <Button sx={{ marginTop: 1 }} variant={"contained"} onClick={() => {
                                    setCycleTime(0);
                                    setIsTimerStart(false);
                                }}>Reset</Button>
                            </div>
                        </FormGroup>

                        <Grid container sx={{ paddingLeft: 10, paddingTop: 2, paddingBottom: 2, marginRight:10 }}>
                            <ScoreCounter name={"Shot High"} value={cargoShotHigh} setScore={setCargoShotHigh}
                                cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                    return acc + (current.HighGoal ? current.cargoShot : 0);
                                }, 0) : 0} />
                            <ScoreCounter maxValue={cargoShotHigh} name={"Scored High"} value={cargoScoredHigh}
                                setScore={setCargoScoredHigh}
                                cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                    return acc + (current.HighGoal ? current.cargoScored : 0);
                                }, 0) : 0} />
                            <ScoreCounter name={"Shot low"} value={cargoShotLow} setScore={setCargoShotLow}
                                cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                    return acc + (!current.HighGoal ? current.cargoShot : 0);
                                }, 0) : 0} />
                            <ScoreCounter maxValue={cargoShotLow} name={"Scored low"} value={cargoScoredLow}
                                setScore={setCargoScoredLow}
                                cycleValue={cycleList.length ? cycleList.reduce(function (acc, current) {
                                    return acc + (!current.HighGoal ? current.cargoScored : 0);
                                }, 0) : 0} />
                        </Grid>
                        <FormGroup sx={{ paddingLeft: 10 , marginRight:10}}>


                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey" />
                            </div>
                            <Typography variant={"h6"} sx={{ marginTop: 5 }}> Climb</Typography>

                            {/*<FormControlLabel control={<Checkbox  checked={isDefultClimb}/>} label={"Climbed: Loading..."} onChange={onChangeIsDefaultClimb}/>*/}

                            <FormControl variant={"standard"} sx={{ marginTop: 1 }}>
                                <Select
                                    labelId="climb-label"
                                    id="Climb"
                                    label="Age"
                                    value={climb}
                                    onChange={e => setClimb(e.target.value)}
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={-1}>Failed</MenuItem>
                                    <MenuItem value={0}>LowBar</MenuItem>
                                    <MenuItem value={1}>MidBar</MenuItem>
                                    <MenuItem value={2}>HighBar</MenuItem>
                                    <MenuItem value={3}>TraversalBar</MenuItem>
                                </Select>
                                <FormHelperText>Select Climb</FormHelperText>
                            </FormControl>



                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey"/>
                            </div>
                            <Typography variant={"h6"} sx={{ marginTop: 5 }}> Extra</Typography>

                            <TextField
                                name="notes"
                                type="text"
                                label="Notes"
                                margin={"normal"}
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                multiline
                                maxRows={4}
                            />
                            <FormControlLabel control={<Checkbox checked={brokeDown} onChange={e => setBrokeDown(e.target.checked)} />} label={"BrokeDown"} />



                        </FormGroup>
                        <Button variant={"contained"} color="primary" onClick={handleSubmit} sx={{ m: 5 }}>Ready</Button>
                    </form>

                </Paper>
            </div>
        </Paper>
    )
}
export default GameForm