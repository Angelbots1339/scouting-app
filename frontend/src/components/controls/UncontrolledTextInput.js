import { TextField} from "@mui/material";
import {Controller} from "react-hook-form";

const UncontrolledTextInput = (props) => {

    return(<Controller
        control={props.control}
        name={props.name}
        defaultValue = ""
        rules={{ required: { value: true, message: 'Invalid input' } }}
        render={({ field }) => (
            <TextField
                {...field}
                { ...props}
            />
        )}
    />)
}
export default UncontrolledTextInput
