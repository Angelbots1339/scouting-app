import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Button, ButtonGroup, CssBaseline } from "@mui/material";
import { color } from "@mui/system";
import { blue, red, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { mainTheme } from "../../theme";


export default function SuperScoutPage() {





    return (


       


            <div >



                <div style={{width: "auto", alignItems:"center"}}>
                    <AppBar style={{display: "flex", alignItems:"center", width:"100"}}>

                        <img src="../../logo200.png" style={{ width: 60, height: 60, borderRadius: 10 }} sx={{ p: 5 }, { m: 5 }} />
                        <ButtonGroup variant="contained" sx={{ m: 2 }}>
                            <Button component={Link} to={'/superScout/pitForm'}>Pit Scout</Button>
                            <Button component={Link} to={'/superScout/teamGrid'}>Team Grid</Button>
                            <Button component={Link} to={'/'}>Home</Button>

                        </ButtonGroup>
                    </AppBar>

                </div>

               



                <Outlet/>

            </div>

        
    );
}