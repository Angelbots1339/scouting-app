import {
    Button,
     FormControlLabel, FormGroup, FormLabel,
    Grid, Paper, Typography, AutocompleteRenderInputParams, MenuItem, Rating, IconButton
} from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import * as yup from "yup";
import { useEffect, useState } from "react";
import TeamDataService from "../../services/team";
import {Field, FieldArray, Formik} from "formik";

import { Remove } from "@mui/icons-material";
import { useMediaQuery } from 'react-responsive'

import { TextField, Autocomplete, Checkbox } from 'formik-mui';
//import team from "../../services/team";




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
            motorType: "",
            shootPositions: "",
            areFalconsLoctited: false,
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
            redFlags: "",

            notes: "",
            flagTeam: false
        }}


            onSubmit={(values, { resetForm }) => {

                let team = values.team;
                delete values.team
                TeamDataService.updateTeam(team, {
                    "isPitScouted": true,
                    "pitScout": values
                }).then(res => console.log(res))
                resetForm();
            }}

            validationSchema={validationSchema}

        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>

                    <Paper sx={{p: 1}}>
                        <FormGroup sx={{ marginLeft:'5%', marginRight:'5%' , marginTop:5}}>
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

                            {/*--------General Robot Info---------*/}
                            <Typography variant={"h6"} sx={{ marginTop: 5 }}>General Robot Info</Typography>



                            <Field
                                component={TextField}
                                type="text"
                                name="driveTrainType"
                                label="Drive Train"
                                select
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{ shrink: true, }}>
                                <MenuItem value={"swerve"}>Swerve</MenuItem>
                                <MenuItem value={"westCoast"}>West Coast</MenuItem>
                                <MenuItem value={"mecanum"}>Mecanum</MenuItem>
                                <MenuItem value={"custom"}>Custom</MenuItem>
                            </Field>


                            <Field
                                component={TextField}
                                type="text"
                                name="motorType"
                                label="Motor Type"
                                select
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{ shrink: true, }}>
                                <MenuItem value={"falcons"}>Falcons</MenuItem>
                                <MenuItem value={"neo"}>Neo</MenuItem>
                                <MenuItem value={"brushed"}>Brushed</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Field>

                            {values.motorType === "falcons" &&
                                <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="areFalconsLoctited" />} label="Are Falcons Loctited" disabled={isSubmitting} />
                            }



                            <Field
                                component={TextField}
                                name="motorCount"
                                type="number"
                                label="Motor Count"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 99 }}
                            />
                           

                            <Field
                                component={TextField}
                                name="batteryCount"
                                type="number"
                                label="Battery Count"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 99 }}
                            />
                            <FormLabel disabled={isSubmitting}>Wiring Organization</FormLabel>
                            <Rating name={"wiringOrganization"} value={values.wiringOrganization}
                                onChange={handleChange} disabled={isSubmitting} />


                            <Field
                                component={TextField}
                                type="text"
                                name="bumperQuality"
                                label="Bumper Quality"
                                select
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{ shrink: true, }}>
                                <MenuItem value={"none"}>No Bumpers</MenuItem>
                                <MenuItem value={"bad"}>Bad</MenuItem>
                                <MenuItem value={"decent"}>Decent</MenuItem>
                                <MenuItem value={"good"}>Good</MenuItem>
                            </Field>



                            {/*---------Shooter----------*/}
                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey"/>
                            </div>





                            <Typography variant={"h6"} sx={{ marginTop: 5 }}>Cargo Manipulation and Shooting</Typography>
                            <Field
                                component={TextField}
                                name="cargoHold"
                                type="number"
                                label="Amount of cargo robot can hold"
                                margin={"normal"}
                                inputProps={{ min: 0, max: 2 }}
                            />
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="canShootInLow" />} label="Can put cargo In Low" disabled={isSubmitting} />
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="canShootInHigh" />} label="Can Shoot cargo to High" disabled={isSubmitting} />
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="groundPickUp" />} label="Can pick up from ground" disabled={isSubmitting} />
                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="terminalPickUp" />} label="Can pick up from terminal" disabled={isSubmitting} />

                            
                            <Field
                                component={TextField}
                                type="text"
                                name="shootPositions"
                                label="Possible Shooting Positions"
                                select
                                variant="standard"
                                margin="normal"
                                InputLabelProps={{ shrink: true, }}>
                                <MenuItem value={"fender"}>Fender</MenuItem>
                                <MenuItem value={"anywhere"}>Anywhere</MenuItem>
                                <MenuItem value={"launchpad"}>Launchpad</MenuItem>
                                <MenuItem value={"tarmac"}>Tarmac</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Field>
                            {/*-------Auto------*/}

                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey"/>
                            </div>


                            <Typography variant={"h6"} sx={{ marginTop: 5 }}>Auto</Typography>
                            <FieldArray name={"autoRoutines"} render={
                                arrayHelpers => (
                                    <div>
                                        {values.autoRoutines.map((auto, index) => (

                                            <Paper key={index} sx={{ m: 0.2 }}>
                                                <Grid container>
                                                    <Field name={`autoRoutines[${index}].position`} component={TextField} type="number"
                                                        label="Position"
                                                        margin={"normal"}
                                                        inputProps={{ min: 1, max: 4 }} />
                                                    <Field name={`autoRoutines[${index}].cargoLow`} component={TextField} type="number"
                                                        label="Cargo Low"
                                                        margin={"normal"}
                                                        inputProps={{ min: 0, max: 5 }} />
                                                    <Field name={`autoRoutines[${index}].cargoHigh`} component={TextField} type="number"
                                                        label="Cargo High"
                                                        margin={"normal"}
                                                        inputProps={{ min: 0, max: 5 }} />
                                                    <FormControlLabel
                                                        control={
                                                            <Field component={Checkbox} type="checkbox" name={`autoRoutines[${index}].offLine`} />
                                                        }
                                                        label="Off Start Line"
                                                    />
                                                    <IconButton type={"button"} sx={{cursor:'pointer'}} onClick={() => arrayHelpers.remove(index)} ><Remove /></IconButton>
                                                </Grid>
                                            </Paper>

                                        ))}
                                        <Button type={"button"} sx={{cursor:'pointer'}} variant={"contained"} onClick={() => arrayHelpers.push({
                                            position: 1,
                                            cargoLow: 0,
                                            cargoHigh: 0,
                                            offLine: false,

                                        }
                                        )}>
                                            Add
                                        </Button>
                                    </div>
                                )
                            } />

                            {/*------Climb---------*/}

                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey"/>
                            </div>


                            <Typography variant={"h6"} sx={{ marginTop: 5 }}>Climb</Typography>
                            <Field
                                component={TextField}
                                type="text"
                                name="climbHeight"
                                label="Climb Height"
                                select
                                variant="standard"
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


                            <FormLabel disabled={isSubmitting}>Climb Confidence</FormLabel>
                            <Rating name={"climbConfidence"} value={values.climbConfidence}
                                onChange={handleChange} disabled={isSubmitting} />




                            {/*------Extra------*/}

                            <div>
                                <hr style={{ width: 'auto', height: 1, borderWidth: 5 }} color="grey"/>
                            </div>



                            <Typography variant={"h6"} sx={{ marginTop: 5 }}>Misc</Typography>




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

                            <FormControlLabel control={<Field component={Checkbox} type="checkbox" name="hasRedFlags" />} label="Has Any Red Flags" disabled={isSubmitting} />


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


                            <FormControlLabel
                                control={
                                    <Field component={Checkbox} type="checkbox" name="flagTeam" color="secondary" />
                                }
                                label="Flag Team"

                            />

                        </FormGroup>
                        <Button type={"submit"} color="primary" variant="contained" sx={{ m: 5,cursor:'pointer' }}>Submit</Button>
                    </Paper>

                </form>)}

        </Formik>



    );
}
export default PitForm;

