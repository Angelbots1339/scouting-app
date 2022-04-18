import React, {useEffect, useState} from "react";
import TeamDataService from "../../services/team";
import {Bar} from '@nivo/bar'
import {ScatterPlot} from "@nivo/scatterplot";
import {Radar} from "@nivo/radar";
import {
    Autocomplete, Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";


const CompData = () => {
    const [data, setData] = useState([]);
    const [radarTerms, setRadarTerms] = useState(["avgClimbScore", "avgContributedCargoScore", "avgAutoScore"]);
    const [radarTeams, setRadarTeams] = useState([]);
    const [radarData, setRadarData] = useState([]);

    const [possibleAxis, setPossibleAxis] = useState([]);
    const [scatterPlotData, setScatterPlotData] = useState([]);
    const [scatterX, setScatterX] = useState("avgClimbScore")
    const [scatterY, setScatterY] = useState("avgContributedCargoScore")
    const [scatterZ, setScatterZ] = useState("avgAutoScore")
    const axisBottom = {
        tickSize: 2,
        tickPadding: 5,
        tickRotation: -90,
        legend: "Teams",
        legendPosition: "middle",
        legendOffset: 40
    };

    const theme = {
        background: "#222222",
        axis: {
            fontSize: "14px",
            tickColor: "#eee",
            ticks: {
                line: {
                    stroke: "#555555"
                },
                text: {
                    fill: "#ffffff"
                }
            },
            legend: {
                text: {
                    fill: "#aaaaaa"
                }
            }
        },
        grid: {
            line: {
                stroke: "#555555"
            }
        }
    };
    const axisLeft = {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Wins / Loss",
        legendPosition: "middle",
        legendOffset: -40
    };
    const legends = [
        {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 190,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 180,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            itemTextColor: "#ffffff",
            symbolSize: 20,
            effects: [
                {
                    on: "hover",
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ];












    useEffect(() => {


        const updateTeams = () => {
            TeamDataService.getAllTeams().then(res => res.data.map(team => team._id.toString())).then(res => {
                setAllTeams(res)
            }).catch(e => console.log(e));
        }
        const updateData = () => {
            TeamDataService.getAllTeamsData().then((res) => {
                res.data.sort((a, b) => a.avgContributedScore - b.avgContributedScore);
                setData(res.data)
                setPossibleAxis(Object.keys(res.data[0]).filter((key) => !isNaN(res.data[0][key])));
            })
        }
        updateData();
        updateTeams();
    }, [])

    useEffect(() => {
        const updateScatterPlot = (data) => {
            let zValues = data.map(team => team[scatterZ]).filter(x => !isNaN(x) && x !== null);

            let min = Math.min(...zValues);
            let max = Math.max(...zValues) - min;
            setScatterPlotData([{
                id: "Teams", data: data.map(x => ({x: x[scatterX], y: x[scatterY], z: (x[scatterZ] - min) / max}))
            }])
            // console.log(scatterPlotData[0].data.map(x => x.z))
        }

        updateScatterPlot(data)
    }, [scatterX, scatterY, scatterZ, data])

    const [allTeams, setAllTeams] = useState([]);

    useEffect(() => {
        const updateRadarPlot = (data) => {
            let tempData = JSON.parse(JSON.stringify(data));
            let newRadarData = [];

            for (let term of radarTerms) {
                // console.log(term)

                tempData.sort((a, b) => a[term] - b[term]);
                // console.log(tempData)
                // console.log(tempData.map(team => `${team.teamNumber}:${team[term]}`))
                let dataRank = {rank: term}
                for (let radarTeam of radarTeams) {
                    //dataRank[radarTeam] = tempData.find(team => team.teamNumber === parseInt(radarTeam))[term]
                    dataRank[radarTeam] = parseInt(tempData.indexOf(tempData.find(team => team.teamNumber === parseInt(radarTeam))) + 1);
                }
                newRadarData.push(dataRank)
            }
            setRadarData(newRadarData)
        }
        updateRadarPlot(data)
    }, [radarTeams, radarTerms, data])





    return (
        <div>
            <Divider>
                <Typography variant={"h6"} sx={{marginTop: 5}}> Bar</Typography>
            </Divider>
            <Bar
                width={1000}
                height={400}
                margin={{top: 60, right: 190, bottom: 60, left: 100}}
                data={data}
                keys={["avgClimbScore", "avgAutoScore", "avgContributedCargoScore"]}
                indexBy="teamNumber"
                labelTextColor="inherit:darker(2.4)"
                labelSkipWidth={12}
                labelSkipHeight={12}
                enableGridX={false}
                axisBottom={axisBottom}
                axisLeft={axisLeft}
                theme={theme}
                valueFormat={">(.0~d"}
                legends={legends}
                tooltip={function (props) {
                    let team = data.find(team => team.teamNumber === props.indexValue);
                    return (
                        <div
                            style={{
                                padding: 12,
                                background: '#222222',
                            }}
                        >
                            <span>{props.indexValue}</span>
                            <br/>
                            <strong>
                                Contributed Score : {team.avgContributedScore.toFixed(2)}
                            </strong>
                            <br/>
                            <strong>
                                Auto Score : {team.avgAutoScore.toFixed(2)}
                            </strong>
                            <br/>
                            <strong>
                                Cargo Score : {team.avgContributedCargoScore.toFixed(2)}
                            </strong>
                            <br/>
                            <strong>
                                Climb Score : {team.avgClimbScore.toFixed(2)}
                            </strong>
                        </div>
                    )
                }}
            />
            <Divider>
                <Typography variant={"h6"} sx={{marginTop: 5}}> Scatter</Typography>
            </Divider>
            <ScatterPlot
                margin={{top: 60, right: 190, bottom: 60, left: 100}}
                data={scatterPlotData}
                width={1000}
                height={400}
                tooltip={({node}) => (
                    <div
                        style={{
                            color: node.color,
                            background: '#333',
                            padding: '12px 16px',
                        }}
                    >
                        <strong>
                            {data[node.index].teamNumber}
                        </strong>
                        <br/>
                        {`${scatterX}: ${node.formattedX}`}
                        <br/>
                        {`${scatterY}: ${node.formattedY}`}
                        <br/>
                        {`${scatterZ}: ${data[node.index][scatterZ]}`}
                    </div>)}

                theme={theme}
                nodeSize={{ key: 'data.z', values: [0, 1], sizes: [9, 32] }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: scatterX,
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: scatterY,
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
            />

            <FormControl>
            <InputLabel id="x-select-label">X</InputLabel>
            <Select
                id="Climb"
                labelId="x-select-label"
                value={scatterX}
                d="x-select" label={"X"}
                onChange={e => {
                    setScatterX(e.target.value);
                }}
            >
                {possibleAxis.map((axis, index) => (<MenuItem key={index} value={axis}>{axis}</MenuItem>))}
            </Select>
            </FormControl>

            <FormControl>
            <InputLabel id="y-select-label">Y</InputLabel>
            <Select labelId="y-select-label" id="y-select" label={"Y"} margin={"dense"} value={scatterY} onChange={e => {
                setScatterY(e.target.value);
            }}>
                {possibleAxis.map((axis, index) => (<MenuItem key={index} value={axis}>{axis}</MenuItem>))}
            </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="z-select-label">Z</InputLabel>
                <Select
                    id="Climb"
                    labelId="z-select-label"
                    value={scatterZ}
                    d="z-select" label={"Z"}
                    onChange={e => {
                        setScatterZ(e.target.value);
                    }}
                >
                    <MenuItem key={"def"} value="">""</MenuItem>
                    {possibleAxis.map((axis, index) => (<MenuItem key={index} value={axis}>{axis}</MenuItem>))}
                </Select>
            </FormControl>

            <Divider>
                <Typography variant={"h6"} sx={{marginTop: 5}}> Radar</Typography>
            </Divider>

            <Autocomplete
                multiple
                id="tags-outlined"
                options={possibleAxis}
                filterSelectedOptions
                value={radarTerms}
                onChange={(event, value) => setRadarTerms(value)}
                renderInput={(params) => (
                    <TextField
                        margin={"dense"}
                        {...params}
                        label="terms"
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-outlined"
                options={allTeams}
                filterSelectedOptions
                value={radarTeams}
                onChange={(event, value) => setRadarTeams(value)}
                renderInput={(params) => (
                    <TextField
                        margin={"dense"}
                        {...params}
                        label="teams"
                    />
                )}
            />

            <Radar keys={radarTeams}
                   valueFormat={">(.0~d"}
                   indexBy={"rank"}
                   margin={{top: 60, right: 190, bottom: 60, left: 100}}
                   data={radarData}
                   width={1000}
                   height={400}
                   theme={theme}
                   sliceTooltip={function (props) {
                       return (
                           <div
                               style={{
                                   padding: 12,
                                   background: '#222222',
                               }}
                           >
                               <span>{props.index}</span>
                               <br/>
                               {props.data.map(team =>
                                   <div style={{
                                       color: team.color
                                   }}>
                                   <strong>
                                       {team.id}: {data.find(x => x.teamNumber === parseInt(team.id))[props.index]}
                                   </strong>
                                   <br/>
                                   </div>
                               )}


                           </div>
                       )
                   }}
                   legends={[
                       {
                           anchor: 'top-left',
                           direction: 'column',
                           translateX: -50,
                           translateY: -40,
                           itemWidth: 80,
                           itemHeight: 20,
                           itemTextColor: '#999',
                           symbolSize: 12,
                           symbolShape: 'circle',
                           effects: [
                               {
                                   on: 'hover',
                                   style: {
                                       itemTextColor: '#000'
                                   }
                               }
                           ]
                       }
                   ]}
            />



        </div>)

}
export default CompData;