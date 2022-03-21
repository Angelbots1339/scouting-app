import {useEffect, useReducer, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormHelperText,
    FormControl,
    Autocomplete,
    Rating,
    DialogActions,
    DialogContent,
    DialogTitle, DialogContentText, Dialog
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
    const [climb, setClimb] = useState(0);
    const [notes, setNotes] = useState("");
    const [broke, setBroke] = useState(false);
    const [brokeNotes, setBrokeNotes] = useState("");
    const [completeBrakeDown, setCompleteBrakeDown] = useState(false);
    const [teamNumber, setTeamNumber] = useState(0);
    const [matchNumber, setMatchNumber] = useState(0);
    const [matchCode, setMatchCode] = useState("qm");


    // ---------Timer-----------


    const ScoreCounter = (props) => {

        const onAdd = () => {
            if (!props.maxValue && props.maxValue !== 0) {
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
                broke,
                brokeNotes,
                completeBrakeDown,
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


        setConfirmOpen(false);
        setMatchNumber(parseInt(matchNumber) + 1)
        setTeamNumber(0)
        setCargoScoredHigh(0)
        setCargoScoredLow(0)
        setCargoShotHigh(0)
        setCargoShotLow(0)
        setAuto({cargoHigh: 0, cargoLow: 0, offLine: false})
        setClimb(0)
        setNotes("")
        setPlayedDefence(false)
        setHerdingBallsRating(0)
        setBotDefenceRating(0)
        setDefenceNotes("")
        setBroke(false)
        setBrokeNotes("")
        setCompleteBrakeDown(false)

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

    const [confirmOpen, setConfirmOpen] = React.useState(false);


    //-----JSX-----
    return (
        <Paper>
            <div>
                <Paper sx={{p: 1}}>
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

                        <Grid container sx={{marginTop: 5, marginLeft: '5%', marginRight: '5%'}}>
                            <ScoreCounter name={"Shot High"} value={cargoShotHigh} setScore={setCargoShotHigh}/>
                            <ScoreCounter maxValue={cargoShotHigh} name={"Scored High"} value={cargoScoredHigh}
                                          setScore={setCargoScoredHigh}/>
                            <ScoreCounter name={"Shot low"} value={cargoShotLow} setScore={setCargoShotLow}/>
                            <ScoreCounter maxValue={cargoShotLow} name={"Scored low"} value={cargoScoredLow}
                                          setScore={setCargoScoredLow}/>
                        </Grid>
                        <FormGroup sx={{marginTop: 5, marginLeft: '5%', marginRight: '5%'}}>
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
                                control={<Checkbox checked={broke} onChange={e => setBroke(e.target.checked)}/>}
                                label={"Robot Broke Temporarily"}/>
                            {broke &&
                                <>
                                <TextField
                                    name="brokeNotes"
                                    type="text"
                                    label="Notes On What Broke"
                                    margin={"normal"}
                                    value={brokeNotes}
                                    onChange={e => setBrokeNotes(e.target.value)}
                                    multiline
                                    maxRows={4}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={completeBrakeDown} onChange={e => setCompleteBrakeDown(e.target.checked)}/>}
                                    label={"Complete Robot Break Down"}/>
                                </>
                            }


                        </FormGroup>
                        <Button variant={"contained"} color="primary" onMouseDown={() => setConfirmOpen(true)}
                                onTouchStart={() => {setConfirmOpen(true)}} sx={{m: 5, cursor: 'pointer'}}>Ready</Button>
                    </form>

                </Paper>
                <Dialog
                    open={confirmOpen}
                    keepMounted

                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Are you sure you want to submit the form?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Make sure you filled out all the fields correctly. Thank You!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} onClick={() => {setConfirmOpen(false)}}>Cancel</Button>
                        <Button variant={"contained"} onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Paper>
    )
}
export default GameForm