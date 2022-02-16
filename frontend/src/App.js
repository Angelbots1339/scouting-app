import {Link} from "react-router-dom";
import superScoutPage from "./components/superScout/SuperScoutPage";
import scoutPage from "./components/scout/ScoutPage";
import {AppBar, Button, ButtonGroup, CssBaseline} from "@mui/material";
import { mainTheme} from "./theme";
import { ThemeProvider } from "@emotion/react";


const theme = mainTheme;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <div>
            <AppBar>
            <ButtonGroup variant={"contained"} sx={{m:2}} >
                <Button component={Link} to={'/scout/pitForm'}>Scout</Button>
                <Button  component={Link} to={'/superScout'}>SuperScout</Button>
            </ButtonGroup>
            </AppBar>
        </div>

        </ThemeProvider>

    );
}

export default App;
