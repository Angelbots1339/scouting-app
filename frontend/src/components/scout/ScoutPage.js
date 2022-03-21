import { Outlet, Link } from "react-router-dom";
import { Button, ButtonGroup, AppBar } from "@mui/material";


export default function ScoutPage() {
    return (

        <div>
            <div style={{ width: "auto", alignItems: "center" }}>
                <AppBar position="sticky" style={{ display: "flex", alignItems: "center", width: "100" }}>

                    
                    <ButtonGroup size={"small"} fullWidth variant="contained" sx={{ m:2, mr:6, ml:6 }}>

                    <Button sx={{ cursor: 'pointer' }} component={Link} to={'/'}>
                            <img src="../../logo200.png" alt={"angleBoticsLogo"} style={{ width: 60, height: 60, borderRadius: 10, m: 5 }} />
                        </Button>
                        
                        <Button sx={{ cursor: 'pointer' }} component={Link} to={'/scout/gameform'}>Game Scout</Button>
                        <Button sx={{ cursor: 'pointer' }} component={Link} to={'/scout/driveteamform'}>Drive Team Form</Button>
                        <Button sx={{ cursor: 'pointer' }} component={Link} to={'/scout/pitform'}>Pit Scout</Button>
                        <Button sx={{cursor:'pointer'}} component={Link} to={'/scout/qualitycheckform'}>Quality Check Form</Button>
                        

                    </ButtonGroup>
                </AppBar>
            </div>
            <Outlet />
        </div>
    );
}