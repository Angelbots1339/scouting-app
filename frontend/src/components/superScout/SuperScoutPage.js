import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import {AppBar, Button, ButtonGroup, Drawer, List, ListItem, ListItemButton, Typography} from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import * as React from "react";
import {useEffect, useState} from "react";
import HomeIcon from "@mui/icons-material/Home";


export default function SuperScoutPage() {

    const [drawerState, setDrawerState] = useState(false);
    const [currentPage, setCurrentPage] = useState("/superScout/teamGrid");


    // This code can be used for variable size on mobile vs desktop


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

                            <Button sx={{cursor: 'pointer'}} variant="contained" component={Link}
                                    to={'/superScout/teamGrid'}>
                                <BlurOnIcon/>
                                <Typography variant={"h6"} sx={{m: 1}}>Team Grid</Typography>
                            </Button>

                        </ButtonGroup>
                    }


                    {/** For Small Screens **/}

                    {!isScreenBig &&
                        <Button size={"small"} variant={"contained"} sx={{cursor: 'pointer', width: 10, m: 2}}
                                onClick={() => setDrawerState(!drawerState)}>
                            <DensitySmallIcon/>
                        </Button>}

                </AppBar>

                {!isScreenBig &&
                    <Drawer
                        open={drawerState}
                        onClick={() => setDrawerState(false)}
                        onClose={() => setDrawerState(false)}>
                        <List sx={{marginX: '20'}}>
                            <ListItem>
                                <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/'}>
                                    <HomeIcon fontSize='large'/>
                                    <Typography variant={"h4"} sx={{m: 1}}>Home</Typography>
                                </ListItemButton>
                            </ListItem>

                            <ListItem sx={{backgroundColor: currentPage === "/superScout/teamGrid" ? 'darkRed' : ''}}>
                                <BlurOnIcon/>
                                <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/superScout/teamGrid'}>
                                    <Typography variant={"h6"} sx={{m: 1}}>Team Grid</Typography>
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Drawer>
                }
            </div>
            <Outlet/>
        </div>


    );
}
