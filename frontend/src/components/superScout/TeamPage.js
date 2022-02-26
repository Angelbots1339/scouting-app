import TeamDataService from "../../services/team";
import { useEffect, useState } from "react";
import { CssBaseline, FormGroup, FormControlLabel, styled, Grid, Paper, Typography, Checkbox, Radio } from "@mui/material";
import { useParams } from "react-router-dom";
import { mainTheme } from "../../theme";




function TeamPage() {
    const { teamNumber } = useParams()


    const [team, setTeam] = useState([]);


    const getTeam = (id) => {
        TeamDataService.getTeam(id).then(response => {
            setTeam(response.data.pitScout)
            console.log(response.data)
        }).catch(e => console.log(e));

    }

    useEffect(() => {
        getTeam(teamNumber)

    }, [teamNumber]);


    const Item = styled(Paper)(({ theme }) => ({
        mainTheme
    }));



    return (

        <div>
            <div style={{ marginTop: 150 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10} sx={{mx:"auto", textAlign:"center"}}>
                        <Item>
                            <Typography variant="h3" sx={{ mx: 1, alignSelf: "center" }} color="primary"> Team {teamNumber}</Typography>
                            <Typography variant="h5" sx={{ mx: 1 }} color="secondary">{"Has Been Scouted: " + team?.isPitScouted || "loading..."}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                            <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Notes: ${team?.notes || "loading..."}`}</Typography>
                            <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Red Flags: ${team?.redFlags || "loading..."}`}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Years Of Experience: ${team?.experienceInYears || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`DriveTrain: ${team?.driveTrainType || "loading..."}`}</Typography>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Using Falcons: ${team?.areUsingFalcons || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>

                        </Item>
                    </Grid>



                </Grid>

                {/* <Typography component="legend">Rating {team || "loading..."}</Typography> */}
            </div>
        </div >

    );
}
export default TeamPage;