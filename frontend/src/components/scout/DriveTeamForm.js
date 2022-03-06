import {
    Autocomplete,
    Button, FormGroup, Paper, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import TeamDataService from "../../services/team";



const PitForm = () => {


    const [team1, setTeam1] = useState(0)
    const [team1Notes, setTeam1Notes] = useState("")
    const [team2, setTeam2] = useState(0)
    const [team2Notes, setTeam2Notes] = useState("")

    const handelSubmit = () => {

        if(team1Notes !== ""){
            TeamDataService.addNote(team1, team1Notes);
        }if(team2Notes !== ""){
            TeamDataService.addNote(team2, team2Notes);
        }
        setTeam1(0);
        setTeam1Notes("");
        setTeam2Notes("");
        setTeam2(0);
    }

    const [allTeams, setAllTeams] = useState([]);


    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        updateTeams();
    }, [])

    return (<form>
            <Paper sx={{ marginTop: 24 }}>
                <FormGroup>

                    <Autocomplete
                        disablePortal
                        options={allTeams}
                        sx={{ width: 300 }}
                        value={team1}
                        onChange={(event, value) => setTeam1(parseInt(value))}
                        renderInput={(params) => <TextField {...params} label="alliance 1 Team Number" />}
                    />



                    <TextField type={"text"} margin={"normal"}
                               multiline
                               maxRows={4} value={team1Notes} onChange={(e) => setTeam1Notes(e.target.value)}
                               label={"alliance 1 Notes"}/>


                    <Autocomplete
                    disablePortal
                    options={allTeams}
                    sx={{ width: 300 }}
                    value={team2}
                    onChange={(event, value) => setTeam2(parseInt(value))}
                    renderInput={(params) => <TextField {...params} label="alliance 2 Team Number" />}
                    />


                    <TextField type={"number"} margin={"normal"}
                               multiline
                               maxRows={4} value={team2Notes} onChange={(e) => setTeam2Notes(e.target.value)}
                               label={"alliance 2 Notes"}/>
                </FormGroup>
                <Button color="primary" variant="contained" sx={{m: 5, cursor:'pointer'}} onClick={handelSubmit} >Submit</Button>
            </Paper>
        </form>


    )
}


export default PitForm;
