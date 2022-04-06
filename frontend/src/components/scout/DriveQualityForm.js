import {
    Autocomplete,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Paper, Rating, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import TeamDataService from "../../services/team";



const DriveQualityForm = () => {


    const [teams, setTeams] = useState([0,0,0,0,0,0])
    const [teamRatings, setTeamRatings] = useState([0,0,0,0,0,0])

    const handelSubmit = () => {
        for (let i = 0; i < teams.length; i++) {
            TeamDataService.addDriveQuality(teams[i], teamRatings[i])
        }
        setTeams([0,0,0,0,0,0])
        setTeamRatings([0,0,0,0,0,0])
        setConfirmOpen(false);
    }

    const [allTeams, setAllTeams] = useState([]);
    const [confirmOpen, setConfirmOpen] = React.useState(false);



    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        updateTeams();
    }, [])

    const updateRatings = (index, value) => {
        let newArr = [...teamRatings]; // copying the old datas array
        newArr[index] = value; // replace e.target.value with whatever you want to change it to
        setTeamRatings(newArr);
    }
    const updateNumber = (index, value) => {
        let newArr = [...teams]; // copying the old datas array
        newArr[index] = value; // replace e.target.value with whatever you want to change it to
        setTeams(newArr);
    }

    return (<form>
            <Paper sx={{}}>
                <FormGroup sx={{marginLeft:'5%', marginRight:'5%' , paddingTop:5}}>

                    {teams.map((val, i) =>
                        <div>
                        <Autocomplete
                            disablePortal
                            options={allTeams}
                            sx={{ width: 300 }}
                            value={teams[i]}
                            margin={"normal"}

                            getOptionLabel={(option => `${option}`)}
                            onChange={(e, value) => updateNumber(i, value)}
                            renderInput={(params) => <TextField {...params} label={`team ${i + 1}`} />}
                        />
                        <Rating
                        name="herdingBallsRating"
                        value={teamRatings[i]}
                        precision={0.5}
                        onChange={(e, value) => updateRatings(i, value)}/>
                        </div>
                    )}

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


export default DriveQualityForm;
