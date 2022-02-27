// import {
//     Button, Paper, TextField
// } from "@mui/material";
// import * as yup from "yup";
// import {useState} from "react";
// import TeamDataService from "../../services/team";
//
// import team from "../../services/team";
//
//
//
// const PitForm = () => {
//
//
//     const [team1, setTeam1] = useState(0)
//     const [team1Notes, setTeam1Notes] = useState(0)
//     const [team2, setTeam2] = useState(0)
//     const [team2Notes, setTeam2Notes] = useState(0)
//
//     const handelSubmit = () => {
//
//         console.log(JSON.stringify(values))
//         alert(JSON.stringify(values, null, 2))
//         let teamNumber = values.team;
//         delete values.team
//         TeamDataService.updateTeam(teamNumber, {
//             "isPitScouted": true,
//             "pitScout": values
//         })
//     }
//
//
//     return (
//         <form onSubmit={handelSubmit}>
//             <Paper>
//
//                 <TextField value={}/>
//
//                 <Button type={"submit"} color="primary" variant="contained" sx={{m: 5}}>Submit</Button>
//             </Paper>
//         </form>
//
//
//     )
// }
//
//
// export default PitForm;
