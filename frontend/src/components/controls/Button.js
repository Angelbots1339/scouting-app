//Button.js
import React from 'react'
import { Button as MuiButton } from "@mui/material";

export default function Button(props) {

    const { text, color, variant, onClick, ...other } = props

    return (
        <MuiButton
            variant={variant || "contained"}
            color={color || "primary"}
            onClick={onClick}
            {...other}>
            {text}
        </MuiButton>
    )
}