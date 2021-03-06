import {Outlet, Link} from "react-router-dom";
import {
    Button, AppBar, Drawer, List, ListItem, Typography, ListItemButton, ButtonGroup
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
    const [isScreenBig, setScreenBig] = useState(false);


    useEffect(() => {


        setScreenBig(window.innerWidth > 800);
        setCurrentPage(window.location.pathname);

    }, []);


    return (

        <div>
            <div style={{width: "auto", alignItems: "center"}}>
                <AppBar position="sticky" style={{display: "flex", alignItems: "left", width: "100"}}>

                    {/** For Big Screens **/}


                    {isScreenBig &&
                        <ButtonGroup sx={{alignSelf: 'center', m: 2}}>
                            <Button sx={{cursor: 'pointer'}} variant="contained" component={Link} to={'/'}>
                                <HomeIcon fontSize='large'/>
                                <Typography variant={"h6"} sx={{m: 1}}>Home</Typography>
                            </Button>


                            <Button sx={{cursor: 'pointer'}} component={Link} variant="contained"
                                    to={'/scout/gameform'}>
                                <SmartToyIcon fontSize='large'/>
                                <Typography variant={"h6"} sx={{m: 1}}>Game Scout</Typography>
                            </Button>

                            <Button sx={{cursor: 'pointer'}} component={Link} variant="contained"
                                    to={'/scout/driveteamform'}>
                                <DriveEtaIcon fontSize='large'/>
                                <Typography variant={"h6"} sx={{m: 1}}>Drive Team Form</Typography>
                            </Button>

                            <Button sx={{cursor: 'pointer'}} component={Link} variant="contained" to={'/scout/pitform'}>
                                <LocalHospitalIcon fontSize='large'/>
                                <Typography variant={"h6"} sx={{m: 1}}>Pit Scout</Typography>
                            </Button>

                            <Button sx={{cursor: 'pointer'}} component={Link} variant="contained"
                                    to={'/scout/qualitycheckform'}>
                                <BuildIcon fontSize='large'/>
                                <Typography variant={"h6"} sx={{m: 1}}>Quality Check Form</Typography>
                            </Button>
                        </ButtonGroup>
                    }


                    {/** For Small Screens **/}

                    {!isScreenBig &&
                        <Button size={"small"} variant={"contained"} sx={{cursor: 'pointer', width: 10, m: 2}}
                                onClick={() => {
                                    setDrawerState(!drawerState);
                                    setCurrentPage(window.location.pathname);
                                }}>
                            <DensitySmallIcon/>
                        </Button>}

                </AppBar>

                {!isScreenBig && <Drawer
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
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/gameform'}>
                                <Typography variant={"h5"} sx={{m: 1}}>Game Scout</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/driveteamform" ? 'darkRed' : ''}}>
                            <DriveEtaIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/driveteamform'}>
                                <Typography variant={"h5"} sx={{m: 1}}>Drive Team Form</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/pitform" ? 'darkRed' : ''}}>
                            <LocalHospitalIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/pitform'}>
                                <Typography variant={"h5"} sx={{m: 1}}>Pit Scout</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{backgroundColor: currentPage === "/scout/qualitycheckform" ? 'darkRed' : ''}}>
                            <BuildIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/scout/qualitycheckform'}>
                                <Typography variant={"h5"} sx={{m: 1}}>Quality Check Form</Typography>
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Drawer>
                }
            </div>
            <Outlet/>
        </div>);

}
