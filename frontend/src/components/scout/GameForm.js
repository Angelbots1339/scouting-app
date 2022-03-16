import {useEffect, useReducer, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton, Paper,
    Typography,
    TextField, MenuItem, Select, FormHelperText, FormControl, Autocomplete, Rating
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
    const [auto, setAuto] = useReducer(stateReducer, {cargoHigh: 0, cargoLow: 0, offLine: false})
    const [climb, setClimb] = useState(-1);
    const [notes, setNotes] = useState("");
    const [brokeDown, setBrokeDown] = useState(false);
    const [teamNumber, setTeamNumber] = useState(0);
    const [matchNumber, setMatchNumber] = useState(0);
    const [matchCode, setMatchCode] = useState("qm");


    // ---------Timer-----------


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
            if (props.value > 0) {
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
                    <IconButton onTouchStart={onAdd} sx={{cursor: 'pointer'}}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton onTouchStart={onMinus} sx={{cursor: 'pointer'}}>
                        <RemoveIcon/>
                    </IconButton>
                </Grid>
            </Paper>
        </Grid>);
    }

<<<<<<< HEAD
    const formatTime = (Time) => {
        const getMiliSeconds = ("0" + ((Time / 10) % 100)).slice(-2);
        const getSeconds = ("0" + Math.floor((Time / 1000) % 60)).slice(-2);
        const getMinutes = ("0" + Math.floor((Time / 60000) % 60)).slice(-2);
        return `${getMinutes}:${getSeconds}:${getMiliSeconds}`
    }

=======
>>>>>>> main

    //const [teams, setTeams] = useState([]);

    //------Form------
    //const [isDefultClimb, setIsDefultClimb] = useState(true);
    const handleSubmit = () => {


        const values =
            {
                _id: `${matchCode}${matchNumber}`,
                cargoShotLow,
                cargoShotHigh,
                cargoScoredLow,
                cargoScoredHigh,
                notes,
                brokeDown,
                auto,
                climb,
                playedDefence,
                herdingBallsRating,
                botDefenceRating,
                defenceNotes,
            }

        if (!playedDefence) {
            delete values.botDefenceRating
            delete values.herdingBallsRating
            delete values.defenceNotes
        }


        TeamDataService.addGame(teamNumber, values).then((data) => console.log(data));


        setMatchNumber(parseInt(matchNumber) + 1)
        setTeamNumber(0)
        setCargoScoredHigh(0)
        setCargoScoredLow(0)
        setCargoShotHigh(0)
        setCargoShotLow(0)
        setAuto({cargoHigh: 0, cargoLow: 0, offLine: false})
        setClimb(0)
        setNotes("")
        setBrokeDown(false)
        setPlayedDefence(false)
        setHerdingBallsRating(0)
        setBotDefenceRating(0)
        setDefenceNotes("")

    }
    //------Team Picker-------
    const [allTeams, setAllTeams] = useState([]);


    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        updateTeams();
    }, [])


    //-------Defence------
    const [playedDefence, setPlayedDefence] = useState(false);
    const [herdingBallsRating, setHerdingBallsRating] = useState(0);
    const [botDefenceRating, setBotDefenceRating] = useState(0);
    const [defenceNotes, setDefenceNotes] = useState("");


    //-----JSX-----
    return (
        <Paper sx={{marginTop: 22}}>
            <div>
                <Paper sx={{m: 1, p: 1}}>
                    <form>
                        <FormGroup sx={{marginTop: 5, marginLeft: '5%', marginRight: '5%'}}>
                            <div>

                                <Autocomplete
                                    disablePortal
                                    options={allTeams}
                                    sx={{width: 300}}
                                    getOptionLabel={(option => `${option}`)}
                                    value={teamNumber}
                                    onChange={(event, value) => setTeamNumber(value)}
                                    renderInput={(params) => <TextField {...params} label="Team Number"/>}
                                />

                                <Grid>

                                    <TextField name={`matchType`}
                                               label="Match Type"
                                               margin={"normal"}
                                               value={matchCode}
                                               onChange={e => setMatchCode(e.target.value)}
                                    />

                                    <TextField name={`matchNumber`} type="number"
                                               label="Match Number"
                                               margin={"normal"}
                                               inputProps={{min: 0, max: 99}}
                                               value={matchNumber}
                                               onChange={e => setMatchNumber(e.target.value)}
                                    />
                                </Grid>

                                <div>
                                    <hr style={{width: 'auto', height: 1, borderWidth: 5}} color="grey"/>
                                </div>
                                <Typography variant={"h6"} sx={{marginTop: 5}}> Auto</Typography>

                                <FormGroup>
                                    <TextField name={`cargoLow`} type="number"
                                               label="Cargo Low"
                                               margin={"normal"}
                                               inputProps={{min: 0, max: 5}}
                                               value={auto.cargoLow}
                                               onChange={e => setAuto({cargoLow: e.target.value})}
                                    />

                                    <TextField name={`cargoHigh`} type="number"
                                               label="Cargo High"
                                               margin={"normal"}
                                               inputProps={{min: 0, max: 5}}
                                               value={auto.cargoHigh}
                                               onChange={e => setAuto({cargoHigh: e.target.value})}/>
                                    <FormControlLabel
                                        control={
                                            <Checkbox type="checkbox" name={`offLine`} value={auto.offLine}
                                                      onChange={e => setAuto({offLine: e.target.checked})}/>
                                        }
                                        label="Off Start Line"
                                    />

                                </FormGroup>


                                <div>
                                    <hr style={{width: 'auto', height: 1, borderWidth: 5}} color="grey"/>
                                </div>


                            </div>
                        </FormGroup>

                        <Grid container sx={{paddingLeft: 10, paddingTop: 2, paddingBottom: 2, marginRight: 10}}>
                            <ScoreCounter name={"Shot High"} value={cargoShotHigh} setScore={setCargoShotHigh}/>
                            <ScoreCounter maxValue={cargoShotHigh} name={"Scored High"} value={cargoScoredHigh}
                                          setScore={setCargoScoredHigh}/>
                            <ScoreCounter name={"Shot low"} value={cargoShotLow} setScore={setCargoShotLow}/>
                            <ScoreCounter maxValue={cargoShotLow} name={"Scored low"} value={cargoScoredLow}
                                          setScore={setCargoScoredLow}/>
                        </Grid>
                        <FormGroup sx={{paddingLeft: 10, marginRight: 10}}>
                            <div>
                                <hr style={{width: 'auto', height: 1, borderWidth: 5}} color="grey"/>
                            </div>
                            <Typography variant={"h6"} sx={{marginTop: 5}}>Defence</Typography>
                            <FormControlLabel
                                control={<Checkbox checked={playedDefence}
                                                   onChange={e => setPlayedDefence(e.target.checked)}/>}
                                label={"Played Defence"}/>
                            {playedDefence &&
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Rating
                                                name="herdingBallsRating"
                                                value={herdingBallsRating}
                                                precision={0.5}
                                                onChange={(event, newValue) => {
                                                    setHerdingBallsRating(newValue);
                                                }}/>}
                                        label={"Herding Balls Rating"}/>
                                    <FormControlLabel
                                        control={
                                            <Rating
                                                name="botDefenceRating"
                                                value={botDefenceRating}
                                                precision={0.5}
                                                onChange={(event, newValue) => {
                                                    setBotDefenceRating(newValue);
                                                }}/>}
                                        label={"Bot Defence Rating"}/>
                                    <TextField
                                        name="defenceNotes"
                                        type="text"
                                        label="Defence Notes"
                                        margin={"normal"}
                                        value={defenceNotes}
                                        onChange={e => setDefenceNotes(e.target.value)}
                                        multiline
                                        maxRows={4}
                                    />
                                </FormGroup>}


                            <div>
                                <hr style={{width: 'auto', height: 1, borderWidth: 5}} color="grey"/>
                            </div>
                            <Typography variant={"h6"} sx={{marginTop: 5}}> Climb</Typography>

                            <FormControl variant={"standard"} sx={{marginTop: 1}}>
                                <Select
                                    labelId="climb-label"
                                    id="Climb"
                                    label="Age"
                                    value={climb}
                                    onChange={e => setClimb(e.target.value)}
                                >
                                    <MenuItem value={0}>
                                        No Climb
                                    </MenuItem>
                                    <MenuItem value={-1}>Failed</MenuItem>
                                    <MenuItem value={1}>LowBar</MenuItem>
                                    <MenuItem value={2}>MidBar</MenuItem>
                                    <MenuItem value={3}>HighBar</MenuItem>
                                    <MenuItem value={4}>TraversalBar</MenuItem>
                                </Select>
                                <FormHelperText>Select Climb</FormHelperText>
                            </FormControl>


                            <div>
                                <hr style={{width: 'auto', height: 1, borderWidth: 5}} color="grey"/>
                            </div>
                            <Typography variant={"h6"} sx={{marginTop: 5}}> Extra</Typography>

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
                            <FormControlLabel
                                control={<Checkbox checked={brokeDown} onChange={e => setBrokeDown(e.target.checked)}/>}
                                label={"BrokeDown"}/>


                        </FormGroup>
                        <Button variant={"contained"} color="primary" onMouseDown={handleSubmit}
                                onTouchStart={handleSubmit} sx={{m: 5, cursor: 'pointer'}}>Ready</Button>
                    </form>

                </Paper>
            </div>
        </Paper>
    )
}
export default GameForm