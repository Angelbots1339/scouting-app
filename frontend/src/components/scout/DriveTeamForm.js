import {
    Autocomplete,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Paper, TextField
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
        setConfirmOpen(false);

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
    const [confirmOpen, setConfirmOpen] = React.useState(false);


    return (<form>
            <Paper sx={{}}>
                <FormGroup sx={{marginLeft:'5%', marginRight:'5%' , paddingTop:5}}>

                    <Autocomplete 
                        disablePortal
                        options={allTeams}
                        sx={{ width: 300 }}
                        value={team1}
                        margin={"normal"}

                        getOptionLabel={(option => `${option}`)}
                        onChange={(event, value) => setTeam1(value)}
                        renderInput={(params) => <TextField {...params} label="alliance 1 Team Number" />}
                    />



                    <TextField type={"text"} margin={"normal"}
                               multiline
                               maxRows={4} value={team1Notes} onChange={(e) => setTeam1Notes(e.target.value)}
                               label={"alliance 1 Notes"}/>


                    <Autocomplete
                    disablePortal
                    options={allTeams}
                    sx={{ width: 300, marginTop:2 }}
                    value={team2}
                    margin={"normal"}

                    getOptionLabel={(option => `${option}`)}
                    onChange={(event, value) => setTeam2(value)}
                    renderInput={(params) => <TextField {...params} label="alliance 2 Team Number" />}
                    />


                    <TextField type={"number"} margin={"normal"}
                               multiline
                               maxRows={4} value={team2Notes} onChange={(e) => setTeam2Notes(e.target.value)}
                               label={"alliance 2 Notes"}/>
                </FormGroup>

                <Button variant={"contained"} color="primary" onClick={() => setConfirmOpen(true)} sx={{m: 5}}>Submit</Button>
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
                        <Button variant={"contained"} onClick={handelSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </form>


    )
}


export default PitForm;
