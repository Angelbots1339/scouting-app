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
            driveTrainType: "",
            areFalconsLoctited: false,
            adultOnDriveTeam: false,
            robotLength: 0,
            robotWidth: 0,
            experienceInYears: 0,
            wiringOrganization: 0,
            batteryCount: 0,
            motorCount: 0,

            cargoHold: 0,
            groundPickUp: false,
            terminalPickUp: false,
            canShootInLow: false,
            canShootInHigh: false,

            autoRoutines: [],

            climbHeight: 'none',
            climbConfidence: 0,

            hasRedFlags: false,
            redFlags:"",
            notes: "",
        }}
                onSubmit={(values, {setSubmitting, resetForm}) => {

                    console.log(JSON.stringify(values))
                    alert(JSON.stringify(values, null, 2))
                    let teamNumber = values.team;
                    delete values.team
                    TeamDataService.updateTeam(teamNumber, {
                        "isPitScouted": true,
                        "pitScout": values
                    })
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

                            {/*--------General Robot Info---------*/}
                            <Typography variant={"h6"}>General Robot Info</Typography>



                            <Field
                                component={TextField}
                                type="text"
                                name="driveTrainType"
                                label="Drive Train"
                                select
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{shrink: true,}}>
                                <MenuItem value={"swerve"}>Swerve</MenuItem>
                                <MenuItem value={"westCoast"}>West Coast</MenuItem>
                                <MenuItem value={"mecanum"}>Mecanum</MenuItem>
                                <MenuItem value={"custom"}>High Rung</MenuItem>
                            </Field>

                            <FormControlLabel
                                control={<Field component={Checkbox} type="checkbox" name="areFalconsLoctited"/>}
                                label="Falcons Loctited"
                                disabled={isSubmitting}
                                helperText={"Yes if no falcons"}
                            /><FormControlLabel
                                control={<Field component={Checkbox} type="checkbox" name="adultOnDriveTeam"/>}
                                label="Adult On Drive Team"
                                disabled={isSubmitting}
                            />
                            <Field
                                component={TextField}
                                name="motorCount"
                                type="number"
                                label="Motor Count"
                                margin={"normal"}
                                inputProps={{min: 0, max: 99}}
                            />
                            <Field
                                component={TextField}
                                name="robotLength"
                                type="number"
                                label="Robot Length in Inches"
                                margin={"normal"}
                                inputProps={{min: 0, max: 99, step: 0.1}}
                            />
                            <Field
                                component={TextField}
                                name="robotWidth"
                                type="number"
                                label="Robot Width in Inches"
                                margin={"normal"}
                                inputProps={{min: 0, max: 99,step: 0.1}}
                            />

                            <Field
                                component={TextField}
                                name="batteryCount"
                                type="number"
                                label="Battery Count"
                                margin={"normal"}
                                inputProps={{min: 0, max: 99}}
                            />
                            <FormLabel disabled={isSubmitting}>Wiring Organization</FormLabel>
                            <Rating name={"wiringOrganization"} value={values.wiringOrganization}
                                    onChange={handleChange} disabled={isSubmitting}/>


                            {/*---------Shooter----------*/}
                            <Typography variant={"h6"}>Cargo Manipulator</Typography>
                            <Field
                                component={TextField}
                                name="cargoHold"
                                type="number"
                                label="Amount of cargo robot can hold"
                                margin={"normal"}
                                inputProps={{min: 0, max: 2}}
                            />
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="canShootInLow"/>} label="Can put cargo In Low" disabled={isSubmitting}/>
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="canShootInHigh"/>} label="Can Shoot cargo to High" disabled={isSubmitting}/>
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="groundPickUp"/>} label="Can pick up from ground" disabled={isSubmitting}/>
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="terminalPickUp"/>} label="Can pick up from terminal" disabled={isSubmitting}/>

                            {/*-------Auto------*/}

                            <Typography variant={"h6"}>Auto</Typography>
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

                            {/*------Climb---------*/}


                            <Typography variant={"h6"}>Climb</Typography>
                            <Field
                                component={TextField}
                                type="text"
                                name="climbHeight"
                                label="Climb Height"
                                select
                                variant="standard"
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

                            <FormLabel disabled={isSubmitting}>Climb Confidence</FormLabel>
                            <Rating name={"climbConfidence"} value={values.climbConfidence}
                                    onChange={handleChange} disabled={isSubmitting}/>




                            {/*------Extra------*/}



                            <Typography variant={"h6"}>Misc</Typography>
                            <Field
                                component={TextField}
                                name="notes"
                                type="text"
                                label="Notes"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                            />

                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="hasRedFlags"/>} label="Has Any Red Flags" disabled={isSubmitting}/>


                            {values.hasRedFlags &&
                            <Field
                                component={TextField}
                                name="redFlags"
                                type="text"
                                label="RedFlags"
                                margin={"normal"}
                                multiline
                                maxRows={4}
                            />}
                        </FormGroup>
                        <Button type={"submit"}>Submit</Button>
                    </Paper>

                </form>)}

        </Formik>

    );
}
export default PitForm;
