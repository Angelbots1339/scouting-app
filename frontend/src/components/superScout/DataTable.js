
import React, {useEffect, useState} from 'react';
import TeamDataService from "../../services/team";

function DataTable(){
    const [rawData, setRawData] = useState([])
    const [loading , setLoading] = useState(false)

    async function updateData() {
        const response = await TeamDataService.getAllTeamsFlattenedData();
        setRawData(response.data);
    }



    useEffect(() => {
        async function getData() {
            const response = await TeamDataService.getAllTeamsFlattenedData();
            setRawData(response.data);
            setLoading(true);
            setInterval(updateData, 10000);
        }
        getData();

    }, []);



    return(

        <div>
            { loading?

                    <table>
                        <thead>
                        <tr key={"labels"}>
                            {Object.keys(rawData[0]).map((key) => <th key={key}>{key}</th>)}
                        </tr>
                        </thead>
                        <tbody>

                        {rawData.map(
                            (info, index)=>{
                                return(
                                    <tr key={index}>
                                        {Object.values(info).map((value, i) => <td key={i}>{value}</td>)}
                                    </tr>
                                )
                            }
                            )
                        }

                        </tbody>
                    </table>


                : <div/>}
        </div>

    )
}

export default DataTable;