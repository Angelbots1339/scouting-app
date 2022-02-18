import TeamDataService from "../../services/team";
import { useEffect, useState } from "react";
import {
    CssBaseline,
    FormGroup,
    FormControlLabel,
    styled,
    Grid,
    Paper,
    Typography,
    Checkbox,
    Radio,
    CircularProgress, Card
} from "@mui/material";
import { useParams } from "react-router-dom";
import { mainTheme } from "../../theme";




function TeamPage() {
    const { teamNumber } = useParams()


    const [team, setTeam] = useState({});
    const [pitScout, setPitScout] = useState({});
    const [hasData, setHasData] = useState(false);


    const getTeam = (id) => {
        TeamDataService.getTeam(id).then(response => {
            setTeam(response.data)
            setPitScout(response.data.pitScout)
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
            {Object.keys(team) !== 0 ?
            <div style={{ marginTop: 150 }}>

                <Grid container spacing={2}>
                    {/*----PitScout----*/}


                    <Grid item xs={10} sx={{mx:"auto", textAlign:"center"}}>
                        <Item>
                            <Typography variant="h3" sx={{ mx: 1, alignSelf: "center" }} color="primary"> Team {teamNumber}</Typography>
                            <Typography variant="h5" sx={{ mx: 1 }} color="secondary">{"Has Been Scouted: " + team?.isPitScouted || "loading..."}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                            <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Notes: ${pitScout?.notes || "loading..."}`}</Typography>
                            <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Red Flags: ${pitScout?.redFlags || "loading..."}`}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Years Of Experience: ${pitScout?.experienceInYears}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{mx:"auto", textAlign:"center"}}>
                        <Item sx={{height:300}}>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`DriveTrain: ${pitScout?.driveTrainType || "loading..."}`}</Typography>
                        <Typography sx={{marginTop:5}} variant="h5" color="secondary">{`Are Falcons loctited: ${pitScout?.areFalconsLoctited || "loading..."}`}</Typography>

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
            </div> :
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >

                        <div style={{position: 'relative', marginTop: 300}}>
                            <CircularProgress  size={60} color="secondary" />
                        </div>


                </Grid> }
        </div >


    );
}
export default TeamPage;