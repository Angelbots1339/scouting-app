import TeamDataService from "../../services/team";
import { useEffect, useState } from "react";
import { styled, Grid, Paper, Typography} from "@mui/material";
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


    const Item = styled(Paper)(() => ({
        mainTheme
    }));



    return (

        <div>
            <div style={{ marginTop: 150 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item>
                            <Typography variant="h3" sx={{ mx: 1, alignSelf: "center" }} color="primary"> Team {teamNumber}</Typography>
                            {rawData?.isPitScouted && <Typography variant="h5" sx={{ mx: 1 }} color="lightGreen">{"Has Been Scouted"}</Typography>}
                            {!rawData?.isPitScouted && <Typography variant="h5" sx={{ mx: 1 }} color="red">{"Has Been Scouted"}</Typography>}
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Notes: ${team?.notes || "loading..."}`}</Typography>
                            {!team?.hasRedFlags && <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="lightGreen">{`No Red Flags`}</Typography>}
                            {team?.hasRedFlags && <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Red Flags: ${team?.redFlags || "loading..."}`}</Typography>}
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`Years Of Experience: ${team?.experienceInYears || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Battery Count: ${team?.batteryCount || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Motor Count: ${team?.motorCount || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Wiring Organization: ${team?.wiringOrganization || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Bumper Quality: ${team?.bumperQuality || "loading..."}`}</Typography>

                            {team?.adultOnDriveTeam && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Adult On Drive Team`}</Typography>}
                            {!team?.adultOnDriveTeam && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Adult On Drive Team`}</Typography>}
                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            <Typography sx={{ marginTop: 5, p: 1 }} variant="h5" color="secondary">{`DriveTrain: ${team?.driveTrainType || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Robot Length: ${team?.robotLength || "loading..."}`}</Typography>
                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Robot Width: ${team?.robotWidth || "loading..."}`}</Typography>
                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Robot Height: ${team?.robotHeight || "loading..."}`}</Typography>


                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Motor Type: ${team?.motorType || "loading..."}`}</Typography>

                            {team?.motorType === "falcons" && team?.areFalconsLoctited && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Loctited Falcons`}</Typography>}
                            {team?.motorType === "falcons" && !team?.areFalconsLoctited && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Loctited Falcons`}</Typography>}





                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>

                            {/* This line breaks the page for some reason. If I comment it out it works, and when I uncomment it it's fine until I reload the page. 
                            React updates the page when I uncomment it and it gets data fine, but claims autoRoutines doesn't exist. */}
                            {/* <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Auto Routine Count: ${team?.autoRoutines.length || "Loading..."}`}</Typography> */}


                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>
                            {team?.canShootInHigh && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Can Shoot In High`}</Typography>}
                            {!team?.canShootInHigh && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Can Shoot In High`}</Typography>}

                            {team?.canShootInLow && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Can Shoot In Low`}</Typography>}
                            {!team?.canShootInLow && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Can Shoot In Low`}</Typography>}

                            {team?.groundPickUp && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Can Pick Up From Ground`}</Typography>}
                            {!team?.groundPickUp && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Can Pick Up From Ground`}</Typography>}

                            {team?.terminalPickUp && <Typography sx={{ p: 1 }} variant="h5" color="lightGreen">{`Can Pick Up From Terminal`}</Typography>}
                            {!team?.terminalPickUp && <Typography sx={{ p: 1 }} variant="h5" color="red">{`Can Pick Up From Terminal`}</Typography>}

                        </Item>
                    </Grid>
                    <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                        <Item sx={{ height: 300 }}>


                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Climb Height: ${team?.climbHeight || "loading..."}`}</Typography>
                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Climb Confidence: ${team?.climbConfidence || "loading..."}`}</Typography>

                            <Typography sx={{ p: 1 }} variant="h5" color="secondary">{`Pit System: ${team?.pitSystem || "loading..."}`}</Typography>

                        </Item>
                    </Grid>

                    {/* team?.autoRoutines just breaks the code. Great.  */}
                    {/* {
                        team?.autoRoutines.map((number) => 
                    
                        <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
                            <Item sx={{ height: 300 }}>
                                {number}
                            </Item>
                        </Grid>
                        ) || "Loading..."
                    } */}



                </Grid>

            </div>
        </div >

    );
}
export default TeamPage;
