import PitForm from "./PitForm";
import {Outlet} from "react-router-dom";
import {ThemeProvider} from "@mui/material";

export default function ScoutPage(){
    return  (
        <Outlet />
    );
}