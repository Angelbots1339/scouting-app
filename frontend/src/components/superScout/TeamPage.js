import TeamDataService from "../../services/team";
import { useEffect, useState } from "react";
import { CssBaseline, FormGroup, FormControlLabel, styled, Grid, Paper, Typography, Checkbox, Radio } from "@mui/material";
import { useParams } from "react-router-dom";
import { mainTheme } from "../../theme";




function TeamPage() {
    const { teamNumber } = useParams()


    const [team, setTeam] = useState([]);
    const [rawData, setRawData] = useState([]);


    const getTeam = (id) => {
        TeamDataService.getTeam(id).then(response => {
            setTeam(response.data.pitScout)
            console.log(response.data)
        }).catch(e => console.log(e));

    }
    const getRawData = (id) => {
        TeamDataService.getTeam(id).then(response => {
            setRawData(response.data)
        }).catch(e => console.log(e));

    }

    useEffect(() => {
        getTeam(teamNumber)
        getRawData(teamNumber)

    }, [teamNumber]);


    const Item = styled(Paper)(({ theme }) => ({
        mainTheme
    }));



    return (

        <div>
            <div style={{ marginTop: 150 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item>
                            <Typography variant="h3" sx={{ mx: 1, alignSelf: "center" }} color="primary"> Team {teamNumber}</Typography>
                            <Typography variant="h5" sx={{ mx: 1 }} color="secondary">{"Has Been Scouted: " + rawData?.isPitScouted || "loading..."}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Notes: ${team?.notes || "loading..."}`}</Typography>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Red Flags: ${team?.redFlags || "loading..."}`}</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Years Of Experience: ${team?.experienceInYears || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`DriveTrain: ${team?.driveTrainType || "loading..."}`}</Typography>
                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Loctited Falcons: ${team?.areFalconsLoctited || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Battery Count: ${team?.batteryCount || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                        <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Can Shoot In High: ${team?.canShootInHigh || "loading..."}`}</Typography>
                        <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Can Shoot In Low: ${team?.canShootInLow || "loading..."}`}</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>

                        </Item>
                    </Grid>



                </Grid>

                {/* <Typography component="legend">Rating {team || "loading..."}</Typography> */}
            </div>
        </div >

    );
}
export default TeamPage;