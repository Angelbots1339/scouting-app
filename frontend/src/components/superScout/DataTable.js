
import React, {useEffect, useState} from 'react';
import TeamDataService from "../../services/team";

function DataTable(){
    const [rawData, setRawData] = useState([])
    const [loading , setLoading] = useState(false)

    // const updateData = () => {
    //     setRawData(TeamDataService.getAllTeamsFlattenedData())
    // }



    useEffect(async () => {

        const response = await TeamDataService.getAllTeamsFlattenedData();

        setRawData(response.data);
        console.log(response.data);
        setLoading(true);

    }, []);

    useEffect(() => {


     // run it, run it



        // return () => {
        //    setInterval(updateData, 20000);
        //     const data = TeamDataService.getAllTeamsFlattenedData();
        //     console.log(data);
        //
        // };
    }, []);


    return(

        <div>
            { loading?

                    <table>
                        <thead>
                        <tr>
                            {Object.keys(rawData[0]).map(key => <th>{key}</th>)}
                        </tr>
                        </thead>
                        <tbody>

                        {rawData.map(
                            (info)=>{
                                return(
                                    <tr>
                                        {Object.values(info).map(value => <td>{value}</td>)}
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