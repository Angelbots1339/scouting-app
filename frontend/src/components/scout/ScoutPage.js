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
import {useEffect, useState} from "react";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';


export default function ScoutPage() {


    const [drawerState, setDrawerState] = useState(false);
    const [currentPage, setCurrentPage] = useState("/scout/gameform");


    // This code can be used for variable size on mobile vs desktop
    //
    //
    // const hasWindow = typeof window !== 'undefined';
    // const [isScreenBig, setScreenBig] = useState(false);
    //
    //
    useEffect(() => {

        // if (hasWindow) {
        //     setScreenBig(window.innerWidth > 100 ? true : false);
        // }
        setCurrentPage(window.location.pathname);

    });

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
                                <HomeIcon fontSize='large'/>
                                <Typography variant={"h4"} sx={{m: 1}}>Home</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/gameform" ? 'darkRed' : ''}}>
                            <SmartToyIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link}
                                            to={'/scout/gameform'}>Game Scout</ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/driveteamform" ? 'darkRed' : ''}}>
                            <DriveEtaIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/driveteamform'} >Drive
                                Team
                                Form</ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/pitform" ? 'darkRed' : ''}}>
                            <LocalHospitalIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/pitform'} >Pit
                                Scout</ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/qualitycheckform" ? 'darkRed' : ''}}>
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