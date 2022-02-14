import {Link} from "react-router-dom";
import superScoutPage from "./components/superScout/SuperScoutPage";
import scoutPage from "./components/scout/ScoutPage";
import {Button, ButtonGroup} from "@mui/material";

const Home = () => <h1><Link to="/about">Click Me</Link></h1>;
const About = () => <h1>About Us</h1>;

function App() {
    return (
        <div>
            <ButtonGroup variant={"contained"} >
                <Button component={Link} to={'/scout/pitForm'}>Scout</Button>
                <Button  component={Link} to={'/superScout'}>SuperScout</Button>
            </ButtonGroup>
        </div>

    );
}

export default App;
