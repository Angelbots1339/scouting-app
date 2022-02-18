import { Link } from "react-router-dom";
import superScoutPage from "./components/superScout/SuperScoutPage";
import scoutPage from "./components/scout/ScoutPage";
import { AppBar, Button, ButtonGroup, CssBaseline } from "@mui/material";
import { mainTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";


const theme = mainTheme;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <div style={{ width: "auto", alignItems: "center" }}>
                    <AppBar  style={{display: "flex", alignItems:"center", width:"100"}}>
                    <img src="logo200.png" style={{ width: 60, height: 60, borderRadius: 10 }} sx={{ p: 5 }, { m: 5 }} />

                        <ButtonGroup variant={"contained"} sx={{ m: 2 }}>
                            <Button component={Link} to={'/scout/pitForm'}>Scout</Button>
                            <Button component={Link} to={'/superScout'}>SuperScout</Button>
                        </ButtonGroup>
                    </AppBar>
                </div>
            </div>

        </ThemeProvider>

    );
}

export default App;
