import {
    Button,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid, Paper, Typography, AutocompleteRenderInputParams, MenuItem, Rating
} from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import {Field, Formik} from "formik";
import * as yup from "yup";
import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";
import {TextField, Autocomplete, Select, RadioGroup, Checkbox, rating} from 'formik-mui';

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
            autoCargoScoredHigh: 0,
            autoCargoScoredLow: 0,
            autoOffLine: false,
            canShootInLow: false,
            canShootInHigh: false,
            wiringOrganization: 0,
            experienceInYears: 0,
            redFlags: "",
            notes: "",
        }}
                onSubmit={(values, { setSubmitting, resetForm } ) => {

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
                    <Paper>
                        <FormGroup>
                            <Field
                                name={"team"}
                                type={"team"}
                                component={Autocomplete}

                                options={allTeams || ['...Loading']}
                                getOptionDisabled={isTeamScouted}
                                sx={{width: 300}}
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
                                    <Field component={Checkbox} type="checkbox" name="canShootInLow" />
                                }
                                label="Can Shoot In Low"
                                disabled={isSubmitting}
                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="canShootInHigh" />
                                }
                                label="Can Shoot In High"
                                disabled={isSubmitting}
                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="autoOffLine" />
                                }
                                label="Moves Off Line In Auto"
                                disabled={isSubmitting}
                            />
                            <Field
                                component={TextField}
                                name="autoCargoScoredHigh"
                                type="number"
                                label="Cargo Scored In High With Auto"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 7 }}
                            />
                            <Field
                                component={TextField}
                                name="autoCargoScoredLow"
                                type="number"
                                label="Cargo Scored In Low With Auto"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 7 }}
                            />
                            <FormLabel disabled={isSubmitting}>Wiring Organization</FormLabel>
                            <Rating name={"wiringOrganization"} value={values.wiringOrganization} onChange={handleChange} disabled={isSubmitting}/>

                            <Field
                                component={TextField}
                                name="experienceInYears"
                                type="number"
                                label="Experience In Years"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 99 }}
                            />
                            <Field
                                component={TextField}
                                name="notes"
                                type="text"
                                label="Notes"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                            />

                            <Field
                                component={TextField}
                                name="redFlags"
                                type="text"
                                label="RedFlags"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                            />
                        </FormGroup>
                        <Button type={"submit"} >Submit</Button>
                    </Paper>

                </form>)}

        </Formik>

    );
}
export default PitForm;
