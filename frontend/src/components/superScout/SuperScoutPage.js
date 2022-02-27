import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Button, ButtonGroup} from "@mui/material";


export default function SuperScoutPage() {





    return (


       


            <div >



                <div style={{width: "auto", alignItems:"center"}}>
                    <AppBar style={{display: "flex", alignItems:"center", width:"100"}}>

                        <img src="../../logo200.png"  alt={"angleBoticsLogo"} style={{ width: 60, height: 60, borderRadius: 10 }} />
                        <ButtonGroup variant="contained" sx={{ m: 2 }}>
                            <Button component={Link} to={'/superScout/teamGrid'}>Team Grid</Button>
                            <Button component={Link} to={'/'}>Home</Button>

                        </ButtonGroup>
                    </AppBar>

                </div>

               



                <Outlet/>

            </div>

        
    );
}