import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";


const columns = [
    {field: '_id', headerName: 'Team', width: 150, renderCell: (params) => (<Button sx={{cursor:'pointer'}} component={Link} variant={"contained"}  to={`/superscout/${params.value}`}>{params.value}</Button>)},
    {field: 'isPitScouted', headerName: 'Pit Scouted', width:150,  type: 'boolean'},
    {field: 'DriveBase', headerName: 'DriveBase', width: 150, valueGetter: (params) => params.row?.pitScout?.driveBaseType},
    {field: 'redFlags', headerName: 'redFlags', width: 150, valueGetter: (params) => params.row?.pitScout?.redFlags},
    {field: 'Experience', headerName: 'Experience In Years', width: 150, valueGetter: (params) => params.row?.pitScout?.experienceInYears, type: Number},
    {field: 'notes', headerName: 'Notes', width: 150},
]




function TeamGrid(){
    const [data, setData] = useState([]);

    const updateData = () => {
        TeamDataService.getAllTeams().then((res) => setData(res.data)).catch(e => console.log(e))
    }

    useEffect(() => {
        updateData();
    }, [])
    return (
       
        <div style={{ height: 400, width: "100%"}}>
            <DataGrid rows={data || []} columns={columns} getRowId={(row) => row._id} pageSize={15} sx={{marginTop:20}} style={{ direction: 'rtl'}}/>
        </div>
        
    );
}
export default TeamGrid;