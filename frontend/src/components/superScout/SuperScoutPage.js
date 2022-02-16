import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { color } from "@mui/system";
import { blue, red, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { mainTheme } from "../../theme";

export default function SuperScoutPage() {


    const theme = mainTheme;




    return (

        
        <ThemeProvider theme={theme} >

            

                <div >





                    <ButtonGroup variant={"contained"} sx={{ m: 2 }} >
                        <Button component={Link} to={'/superScout/pitForm'}>Scout</Button>
                        <Button component={Link} to={'/superScout/teamGrid'}>Team Grid</Button>
                        <Button component={Link} to={'/'}>Home</Button>

                    </ButtonGroup>

                    <hr style={{
                        color: '#a80000',
                        backgroundColor: '#a80000',
                        height: 10,
                        borderColor: '#a80000'
                    }} />



                    <Outlet />

                </div>

        </ThemeProvider>
    );
}