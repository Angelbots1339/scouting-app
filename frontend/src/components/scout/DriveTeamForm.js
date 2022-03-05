import {
    Button, FormGroup, Paper, TextField
} from "@mui/material";
import {useState} from "react";
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


    return (<form onSubmit={handelSubmit}>
            <Paper sx={{ marginTop: 20 }}>
                <FormGroup>
                    <TextField type={"number"} margin={"normal"} value={team1} onChange={(e) => setTeam1(e.target.value)}
                               label={"alliance 1 Team Number"}/>
                    <TextField type={"text"} margin={"normal"}
                               multiline
                               maxRows={4} value={team1Notes} onChange={(e) => setTeam1Notes(e.target.value)}
                               label={"alliance 1 Notes"}/>
                    <TextField type={"text"} margin={"normal"} value={team2} onChange={(e) => setTeam2(e.target.value)}
                               label={"alliance 2 Team Number"}/>
                    <TextField type={"number"} margin={"normal"}
                               multiline
                               maxRows={4} value={team2Notes} onChange={(e) => setTeam2Notes(e.target.value)}
                               label={"alliance 2 Notes"}/>
                </FormGroup>
                <Button type={"submit"} color="primary" variant="contained" sx={{m: 5, cursor:'pointer'}} onT>Submit</Button>
            </Paper>
        </form>


    )
}


export default PitForm;
