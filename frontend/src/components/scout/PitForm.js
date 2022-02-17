import {
    Button,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid, Paper, Typography, AutocompleteRenderInputParams, MenuItem, Rating, ButtonGroup, CssBaseline
} from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import TeamDataService from "../../services/team";
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
            team: '',
            climbHeight: 'none',
            autoOffLine: false,
            autoRoutines: [],
            canShootInLow: false,
            canShootInHigh: false,
            driveTrainType: '',
            areUsingFalcons: false,
            wiringOrganization: 0,
            experienceInYears: 0,
            redFlags: "",
            notes: "",
            flagTeam: false
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
                    <Paper sx={{marginTop:15}}>
                        <FormGroup sx={{p:10}}>
                            <Field
                                name={"team"}
                                type={"team"}
                                component={Autocomplete}

                                options={allTeams || ['...Loading']}
                                getOptionDisabled={isTeamScouted}
                                sx={{ width: 300 }}
                                isOptionEqualToValue={(option, value) => {
                                    if (value === "" || value === option || value === `undefined`) {
                                        return true;
                                    }
                                }}
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                    <MuiTextField
                                        {...params}
                                        name="team"
                                        error={touched['team'] && !!errors['team']}
                                        helperText={touched['team'] && errors['team']}
                                        label="team"
                                        variant="outlined"
                                        color="secondary"
                                    />
                                )}
                            />
                            <Field
                                component={TextField}
                                type="text"
                                name="climbHeight"
                                label="Climb Height"
                                select
                                variant="standard"
                                helperText="Please select Climb"
                                margin="normal"
                                color="secondary"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >

                                <MenuItem value={"none"}>None</MenuItem>
                                <MenuItem value={"lowRung"}>Low Rung</MenuItem>
                                <MenuItem value={"midRung"}>Mid Rung</MenuItem>
                                <MenuItem value={"highRung"}>High Rung</MenuItem>
                                <MenuItem value={"traversalRung"}>Traversal Rung</MenuItem>

                            </Field>


                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="canShootInLow" color="secondary"/>
                                }
                                label="Can Shoot In Low"
                                disabled={isSubmitting}
                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="canShootInHigh" color="secondary" />
                                }
                                label="Can Shoot In High"
                                disabled={isSubmitting}
                            />

                            <Field
                                component={TextField}
                                name="driveTrainType"
                                type="text"
                                label="Drive Train Type"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 99 }}
                                color="secondary"
                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="areUsingFalcons" color="secondary"/>
                                }
                                label="Are They Using Falcons?"
                                disabled={isSubmitting}
                            />
                            
                        </FormGroup>

                        <hr style={{
                            color: '#a80000',
                            backgroundColor: '#a80000',
                            height: 10,
                            borderColor: '#a80000'
                        }} />


                        <FormGroup  sx={{p:10}}>

                            {/*<FieldArray value={{values.autoRoutines}} name={"autoRoutines"}>*/}
                            {/*    {({push, remove}) => (*/}
                            {/*        {*/}
                            {/*            ((_, index) => (*/}

                            {/*            ))*/}
                            {/*        }*/}
                            {/*    )}*/}
                            {/*</FieldArray>*/}
                            <FormLabel disabled={isSubmitting}>Wiring Organization</FormLabel>
                            <Rating name={"wiringOrganization"} value={values.wiringOrganization}
                                onChange={handleChange} disabled={isSubmitting} />

                            <Field
                                component={TextField}
                                name="experienceInYears"
                                type="number"
                                label="Experience In Years"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 99 }}
                                disabled={isSubmitting}
                                color="secondary"

                            />
                            <Field
                                component={TextField}
                                name="notes"
                                type="text"
                                label="Notes"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                                disabled={isSubmitting}
                                color="secondary"

                            />

                            <Field
                                component={TextField}
                                name="redFlags"
                                type="text"
                                label="RedFlags"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                                disabled={isSubmitting}
                                color="secondary"

                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="flagTeam" color="secondary"/>
                                }
                                label="Flag Team"

                            />
                        </FormGroup>
                        <Button type={"submit"} color="primary" variant="contained" sx={{m:5}}>Submit</Button>
                    </Paper>

                </form>)}

        </Formik>

       

    );
}
export default PitForm;
