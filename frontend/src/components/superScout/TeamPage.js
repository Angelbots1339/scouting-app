import TeamDataService from "../../services/team";
import { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";
import { mainTheme } from "../../theme";
import { ThemeProvider } from "@emotion/react";


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

    const theme = mainTheme;



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <h1>{teamNumber}</h1>
                <h2>{`notes: ${team?.notes || ""}`}</h2>
                <h2>{"has scouted : " + team?.isPitScouted || "loading..."}</h2>
                {/* <Typography component="legend">Rating {team || "loading..."}</Typography> */}

            </div>
        </ThemeProvider>
    );
}
export default TeamPage;