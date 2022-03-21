import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TeamDataService from "../../services/team";


const columns = [
    {field: '_id', headerName: 'Team', width: 150, renderCell: (params) => (<Button sx={{cursor:'pointer'}} component={Link} variant={"contained"}  to={`/superscout/${params.value}`}>{params.value}</Button>)},
    {field: 'isPitScouted', headerName: 'Pit Scouted', width:150,  type: 'boolean'},
    {field: 'gamesScouted', headerName: 'Games Scouted', width:150,  valueGetter: (params) => params.row?.games.length}, 
    {field: 'DriveBase', headerName: 'DriveBase', width: 150, valueGetter: (params) => params.row?.pitScout?.driveTrainType},
    {field: 'redFlags', headerName: 'redFlags', width: 150, valueGetter: (params) => params.row?.pitScout?.redFlags},
    {field: 'Experience', headerName: 'Experience In Years', width: 150, valueGetter: (params) => params.row?.pitScout?.experienceInYears, type: Number},
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
       
        <div style={{ height: 400, width: "90%", marginLeft:'5%', marginRight:'5%'}}>
            <DataGrid rows={data || []} columns={columns} getRowId={(row) => row._id} pageSize={15} sx={{marginTop:20}}/>
        </div>
        
    );
}
export default TeamGrid;