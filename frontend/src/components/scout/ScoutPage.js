import { Outlet, Link } from "react-router-dom";
import { Button, ButtonGroup, AppBar } from "@mui/material";


export default function ScoutPage() {
    return (
       
            <div>
            <div style={{width: "auto", alignItems:"center"}}>
                <AppBar style={{display: "flex", alignItems:"center", width:"100"}}>
                <img src="../../logo200.png" alt={"angleBoticsLogo"} style={{ width: 60, height: 60, borderRadius: 10 }}/>

                <ButtonGroup variant="contained" sx={{ m: 2 }}>


                    <Button sx={{cursor:'pointer'}} component={Link} to={'/scout/pitform'}>Pit Scout</Button>
                    <Button sx={{cursor:'pointer'}} component={Link} to={'/scout/gameform'}>Game Scout</Button>
                    <Button sx={{cursor:'pointer'}} component={Link} to={'/scout/driveteamform'}>Drive Team Form</Button>
                    <Button sx={{cursor:'pointer'}} component={Link} to={'/scout/qualitycheckform'}>Quality Check Form</Button>
                    <Button sx={{cursor:'pointer'}} component={Link} to={'/'}>Home</Button>

                </ButtonGroup>
                </AppBar>
                </div>
                <Outlet />
            </div>
    );
}