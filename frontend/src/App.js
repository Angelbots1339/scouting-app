import {Link} from "react-router-dom";
import superScoutPage from "./components/superScout/SuperScoutPage";
import scoutPage from "./components/scout/ScoutPage";
import {Button, ButtonGroup} from "@mui/material";
import { mainTheme} from "./theme";
import { ThemeProvider } from "@emotion/react";


const theme = mainTheme;

function App() {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <ButtonGroup variant={"contained"} >
                <Button component={Link} to={'/scout/pitForm'}>Scout</Button>
                <Button  component={Link} to={'/superScout'}>SuperScout</Button>
            </ButtonGroup>
        </div>

        </ThemeProvider>

    );
}

export default App;
