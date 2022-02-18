import {Link, useNavigate, Outlet} from "react-router-dom";
import {AppBar, Autocomplete, Button, ButtonGroup, CssBaseline, Grid, TextField} from "@mui/material";
import {color} from "@mui/system";
import {blue, red, orange} from "@mui/material/colors";
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import {mainTheme} from "../../theme";
import {useCallback, useEffect, useState} from "react";
import TeamDataService from "../../services/team";


export default function SuperScoutPage() {

    const navigate = useNavigate();
    const handleOnClick = useCallback((event, value) => navigate(`/superScout/${value}`, {replace: true}), [navigate]);
    const [allTeams, setAllTeams] = useState([]);


    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        updateTeams();
    }, [])


    return (


        <div>


            <div style={{width: "auto", alignItems: "center"}}>
                <AppBar style={{display: "flex", alignItems: "center", width: "100"}}>


                    <img src="../../logo200.png" style={{width: 60, height: 60, borderRadius: 10}} sx={{p: 5, m: 5}}/>

                    <ButtonGroup variant="contained" sx={{m: 2}}>
                        <Button component={Link} to={'/superScout/teamGrid'}>Team Grid</Button>
                        <Button component={Link} to={'/'}>Home</Button>
                        <Autocomplete
                            disablePortal
                            id="Team Search"
                            options={allTeams}
                            sx={{width: 150}}
                            onChange={handleOnClick}
                            renderInput={(params) => <TextField {...params} label="Team Search"/>}
                        />
                    </ButtonGroup>




                </AppBar>

            </div>


            <Outlet/>

        </div>


    );
}