import TeamDataService from "../../services/team";
import {useEffect, useState} from "react";
import {Rating, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

function TeamPage () {
        const {teamNumber} = useParams()


        const [team, setTeam] = useState([]);


        const getTeam = (id) => {
            TeamDataService.getTeam(id).then(response => {
                setTeam(response.data)
                console.log(response.data)
            }).catch(e => console.log(e));

        }

        useEffect(() =>{
            getTeam(teamNumber)

        }, [teamNumber] );



        return (
        <div>
            <h1>{teamNumber}</h1>
            <h2>{`notes: ${team?.notes || ""}`}</h2>
            <h2>{"has scouted : " + team?.isPitScouted || "loading..."}</h2>
            <Typography component="legend">Rating</Typography>
        </div>
    );
}
export default TeamPage;