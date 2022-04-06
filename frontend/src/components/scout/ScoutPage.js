import {Outlet, Link} from "react-router-dom";
import {
    Button,
    AppBar,
    Drawer,
    List,
    ListItem,
    Typography,
    ListItemButton
} from "@mui/material";
import * as React from 'react';
import { useState} from "react";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import BuildIcon from '@mui/icons-material/Build';


export default function ScoutPage() {


    const [drawerState, setDrawerState] = useState(false);


    // This code can be used for variable size on mobile vs desktop
    //
    //
    // const hasWindow = typeof window !== 'undefined';
    // const [isScreenBig, setScreenBig] = useState(false);
    //
    //
    // useEffect(() => {
    //
    //     if (hasWindow) {
    //         setScreenBig(window.innerWidth > 100 ? true : false);
    //     }
    //
    //
    //
    // });



       return (

        <div>
            <div style={{width: "auto", alignItems: "center"}}>
                <AppBar position="sticky" style={{display: "flex", alignItems: "left", width: "100"}}>


                    <Button size={"small"} variant={"contained"} sx={{cursor: 'pointer', width: 10, m: 2}}
                            onClick={() => setDrawerState(!drawerState)}>
                        <DensitySmallIcon/>
                    </Button>

                </AppBar>

                <Drawer
                    open={drawerState}
                    onClick={() => setDrawerState(false)}
                    onClose={() => setDrawerState(false)}
                >

                    <List sx={{marginX: '20'}}>
                        <ListItem>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/'}>
                                <img src="../../logo200.png" alt={"angleBoticsLogo"}
                                     style={{width: 60, height: 60, borderRadius: 10, m: 5}}/>
                                <Typography variant={"h4"} sx={{m: 1}}>Home</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <SmartToyIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link}
                                            to={'/scout/gameform'}>Game Scout</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <DriveEtaIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/driveteamform'}>Drive
                                Team
                                Form</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <LocalHospitalIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/pitform'}>Pit
                                Scout</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <BuildIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/qualitycheckform'}>Quality
                                Check
                                Form</ListItemButton>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
            <Outlet/>
        </div>
    );

}
