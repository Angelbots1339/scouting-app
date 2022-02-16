import {
    Button,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid, Paper, Typography, AutocompleteRenderInputParams, MenuItem, Rating, IconButton
} from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import MuiCheckBox from '@mui/material/Checkbox';
import {Field, FieldArray, Formik} from "formik";
import * as yup from "yup";
import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";
import {TextField, Autocomplete, Select, RadioGroup, Checkbox, rating} from 'formik-mui';
import {Add, Remove} from "@mui/icons-material";

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
            wiringOrganization: 0,
            experienceInYears: 0,
            redFlags: "",
            notes: "",
        }}
                onSubmit={(values, {setSubmitting, resetForm}) => {

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
                                    <Field component={Checkbox} type="checkbox" name="canShootInLow"/>
                                }
                                label="Can Shoot In Low"
                                disabled={isSubmitting}
                            />
                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="canShootInHigh"/>
                                }
                                label="Can Shoot In High"
                                disabled={isSubmitting}
                            />
                            <Typography variant={"h6"}>Auto Routes</Typography>
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
                                            position: 1,
                                            cargoLow: 0,
                                            cargoHigh: 0,
                                            offLine: false
                                        }
                                        )}>
                                            Add
                                        </Button>
                                    </div>
                                )
                            }/>
                            <FormLabel disabled={isSubmitting}>Wiring Organization</FormLabel>
                            <Rating name={"wiringOrganization"} value={values.wiringOrganization}
                                    onChange={handleChange} disabled={isSubmitting}/>


                            <Field
                                component={TextField}
                                name="experienceInYears"
                                type="number"
                                label="Experience In Years"
                                margin={"normal"}
                                inputProps={{min: 0, max: 99}}
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
                        <Button type={"submit"}>Submit</Button>
                    </Paper>

                </form>)}

        </Formik>

    );
}
export default PitForm;
