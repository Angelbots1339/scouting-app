import {DataGrid} from "@mui/x-data-grid";
import {Button, Rating} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";

const columns = [
    {field: '_id', headerName: 'Team', width: 150, renderCell: (params) => (<Button component={Link} to={`/superscout/${params.value}`}>{params.value}</Button>)},
    {field: 'isPitScouted', headerName: 'Pit Scouted', width:150,  type: 'boolean'},
    {field: 'DriveBase', headerName: 'DriveBase', width: 150, valueGetter: (params) => params.row?.pitScout?.driveBaseType},
    {field: 'redFlags', headerName: 'redFlags', width: 150, valueGetter: (params) => params.row?.pitScout?.redFlags},
    {field: 'Experience', headerName: 'Experience In Years', width: 150, valueGetter: (params) => params.row?.pitScout?.experienceInYears, type: Number},
    {field: 'notes', headerName: 'Notes', width: 150},
]
function renderRating(params) {
    return <Rating readOnly value={params.value} />;
}


function TeamGrid(){
    const test = "234"
    const [data, setData] = useState([]);

    const updateData = () => {
        TeamDataService.getAllTeams().then((res) => setData(res.data)).catch(e => console.log(e))
    }

    useEffect(() => {
        updateData();
    }, [])
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={data || []} columns={columns} getRowId={(row) => row._id} pageSize={15}/>
        </div>
    );
}
export default TeamGrid;