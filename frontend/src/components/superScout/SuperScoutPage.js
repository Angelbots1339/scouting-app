import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import {AppBar, Button, Drawer, List, ListItem, ListItemButton, Typography} from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import * as React from "react";
import { useState} from "react";


export default function SuperScoutPage() {

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
                            <BlurOnIcon/>
                            <ListItemButton sx={{cursor: 'pointer'}} component={Link} to={'/superScout/teamGrid'}>Team Grid</ListItemButton>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
            <Outlet/>
        </div>



    );
}