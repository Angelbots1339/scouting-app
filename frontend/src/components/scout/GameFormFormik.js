import {
    Button,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid, Paper, Typography, AutocompleteRenderInputParams, MenuItem, Rating, IconButton
} from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import MuiCheckBox from '@mui/material/Checkbox';
import {Field, FieldArray, Formik} from "formik";

import * as yup from "yup";
import { useEffect, useState } from "react";
import TeamDataService from "../../services/team";

import {Add, Remove} from "@mui/icons-material";

import { TextField, Autocomplete, Select, RadioGroup, Checkbox, rating } from 'formik-mui';
import { blue } from "@mui/material/colors";
import { mainTheme} from "../../theme";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";



const validationSchema = yup.object({
    team: yup.string().required("Team Number Required").nullable(),
    climbHeight: yup.string().required("test Number Required")

})
const PitForm = () => {


    const [allTeams, setAllTeams] = useState([]);
    const [needScoutTeams, setNeedScoutTeams] = useState([]);


    const updateTeams = () => {
        TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setAllTeams(res)
        }).catch(e => console.log(e));
        TeamDataService.getScoutNeededTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
            setNeedScoutTeams(res)
        }).catch(e => console.log(e));


    }

    useEffect(() => {
        updateTeams();
    }, [])

    const isTeamScouted = (team) => {
        return !needScoutTeams.includes(team);
    }


    return (


        <Formik initialValues={{
            auto: {},
            cycles: [],
            climb: 0
        }}


                onSubmit={(values, { setSubmitting, resetForm }) => {

                    console.log(JSON.stringify(values))
                    alert(JSON.stringify(values, null, 2))
                    let teamNumber = values.team;
                    delete values.team
                    // TeamDataService.updateTeam(teamNumber, {
                    //     "isPitScouted": true,
                    //     "pitScout": values
                    // })
                    resetForm();
                }}

                validationSchema={validationSchema}

        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>


                    <FieldArray name={"autoRoutines"} render={
                        arrayHelpers => (
                            <div>
                                {values.autoRoutines.map((auto, index) => (

                                    <Paper key={index} sx={{m:0.2}}>
                                        <Grid container>
                                            <Field name={`autoRoutines[${index}].position`} component={TextField} type="number"
                                                   label="Position"
                                                   margin={"normal"}
                                                   inputProps={{min: 1, max: 4}}/>
                                            <Field name={`autoRoutines[${index}].cargoLow`} component={TextField} type="number"
                                                   label="Cargo Low"
                                                   margin={"normal"}
                                                   inputProps={{min: 0, max: 5}}/>
                                            <Field name={`autoRoutines[${index}].cargoHigh`} component={TextField} type="number"
                                                   label="Cargo High"
                                                   margin={"normal"}
                                                   inputProps={{min: 0, max: 5}}/>
                                            <FormControlLabel
                                                control={
                                                    <Field component={Checkbox}  type="checkbox" name={`autoRoutines[${index}].offLine`}/>
                                                }
                                                label="Off Start Line"
                                            />
                                            <IconButton type={"button"} onClick={() => arrayHelpers.remove(index)} ><Remove /></IconButton>
                                        </Grid>
                                    </Paper>

                                ))}
                                <Button type={"button"} variant={"outlined"} onClick={() => arrayHelpers.push({
                                        cargoShotLow: 0,
                                        cargoShotHigh: 0,
                                        cargoScoredHigh: 0,
                                        cargoScoredLow: 0,
                                        time: 0,
                                    }
                                )}>
                                    Add
                                </Button>
                            </div>
                        )
                    }/>

                    <Button>Submit</Button>
                </form>)}

        </Formik>



    );
}
export default PitForm;
