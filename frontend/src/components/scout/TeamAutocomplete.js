import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";
import {Autocomplete, TextField} from "@mui/material";

export default function (TeamAutocomplete){
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
        <Controller
            control={control}
            name="team"
            render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                    {...field}
                    onChange={(e, v) => onChange(v)}
                    fullWidth
                    options={allTeams}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            inputRef={ref}
                            error={!!errors?.team}
                            helperText={errors?.team?.message}
                            label="Team"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                )
                            }}
                        />
                    )}
                />
            )}
        />

    );
}