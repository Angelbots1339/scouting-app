import PitForm from "./PitForm";
import { Outlet, Link } from "react-router-dom";
import { ThemeProvider, CssBaseline, Button, ButtonGroup, AppBar } from "@mui/material";
import { mainTheme } from "../../theme";



const theme = mainTheme;


export default function ScoutPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
            <div style={{width: "auto", alignItems:"center"}}>
                <AppBar style={{display: "flex", alignItems:"center", width:"100"}}>
                <img src="../../logo200.png" style={{ width: 60, height: 60, borderRadius: 10 }} sx={{ p: 5 }, { m: 5 }} />

                <ButtonGroup variant="contained">

                    <Button component={Link} to={'/'}>Home</Button>

                </ButtonGroup>
                </AppBar>
                </div>
                <Outlet />
            </div>
        </ThemeProvider>
    );
}