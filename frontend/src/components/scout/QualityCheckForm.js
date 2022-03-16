import {
    Autocomplete,
    Button, Checkbox, FormControlLabel, FormGroup, Paper, Rating, styled, TextField, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import TeamDataService from "../../services/team";

import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});


const QualityCheckForm = () => {


    const [allTeams, setAllTeams] = useState([]);
    const [team, setTeam] = useState(0)
    const [teamQualityCheck, setTeamQualityCheck] = useState({
        driveBaseRating: 2.5,
        superStructureRating: 2.5,
        bumperRating: 2.5,
        mechanicalNotes: "",
        electricalRating: 2.5,
        electricalNotes: "",
        dnp: false
    })

    const handelSubmit = () => {

        if(team !== ""){
            //TeamDataService.addQualityCheck(team, teamQualityCheck);
            console.log(teamQualityCheck)
        }
        setTeam(0)
        setTeamQualityCheck({
            timeStamp: Date.now(),
            driveBaseRating: 2.5,
            superStructureRating: 2.5,
            bumperRating: 2.5,
            mechanicalNotes: "",
            electricalRating: 2.5,
            electricalNotes: "",
            dnp: false
        })
    }

    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
    }
    useEffect(() => {
        updateTeams();
    }, [])




    return (<form>
            <Paper>
                <FormGroup sx={{marginLeft:'5%', marginRight:'5%' , paddingTop:5}}>

                    <Autocomplete
                        disablePortal
                        options={allTeams}
                        sx={{ width: 300 }}
                        getOptionLabel={(option => `${option}`)}
                        value={team}
                        onChange={(event, value) => setTeam(value)}
                        renderInput={(params) => <TextField {...params} label="alliance 1 Team Number" />}
                    />

                    <Typography component="legend">Drive Base Rating</Typography>
                    <StyledRating  size="large" icon={<FavoriteIcon fontSize="inherit" />}
                             emptyIcon={<FavoriteBorderIcon fontSize="inherit" />} name="driveBaseRating" value={teamQualityCheck.driveBaseRating} defaultValue={0} precision={0.5} onChange={(e, newValue) => setTeamQualityCheck(prevValue =>({...prevValue, driveBaseRating: newValue}))}/>
                    <Typography component="legend">Super Structure Rating</Typography>
                    <StyledRating icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}  size="large" name="superStructureRating" value={teamQualityCheck.superStructureRating} defaultValue={0} precision={0.5} onChange={(e, newValue) => setTeamQualityCheck(prevValue =>({...prevValue, superStructureRating: newValue}))}/>
                    <Typography component="legend">BumperRating</Typography>
                    <StyledRating icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />} size="large" name="bumperRating" value={teamQualityCheck.bumperRating} defaultValue={0} precision={0.5} onChange={(e, newValue) => setTeamQualityCheck(prevValue =>({...prevValue, bumperRating: newValue}))}/>

                    <TextField type={"mechanicalNotes"} margin={"normal"}
                               multiline
                               maxRows={4} value={teamQualityCheck.mechanicalNotes} onChange={(e) => setTeamQualityCheck(prevValue =>({...prevValue, mechanicalNotes: e.target.value}))}
                               label={"Mechanical Notes"}/>

                    <Typography component="legend">Electrical Rating</Typography>
                    <Rating icon={<BoltIcon fontSize="inherit" />}
                            emptyIcon={<BoltIcon fontSize="inherit" />} size="large"  name="electricalRating" value={teamQualityCheck.electricalRating} defaultValue={0} precision={0.5} onChange={(e, newValue) => setTeamQualityCheck(prevValue =>({...prevValue, electricalRating: newValue}))}/>

                    <TextField type={"electricalNotes"} margin={"normal"}
                               multiline
                               maxRows={4} value={teamQualityCheck.electricalNotes} onChange={(e) => setTeamQualityCheck(prevValue =>({...prevValue, electricalNotes: e.target.value}))}
                               label={"Electrical Notes"}/>
                    <FormControlLabel
                        control={
                            <Checkbox type="checkbox" name={`offLine`} value={teamQualityCheck.dnp}
                                      onChange={(e, value) => setTeamQualityCheck(prevValue =>({...prevValue, dnp: value}))}
                                      icon={<FavoriteIcon />}
                                      checkedIcon={<HeartBrokenIcon />}
                                      size={"large"}
                            />
                        }
                        label="DNP"
                    />




                </FormGroup>
                <Button color="primary" variant="contained" sx={{m: 5, cursor:'pointer'}} onClick={handelSubmit} >Submit</Button>
            </Paper>
        </form>


    )
}


export default QualityCheckForm;
