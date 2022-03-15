import express from "express"
import cors from "cors"
import Event from "./api/event.route.js"

const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}));



app.use("/api/v1", Event)
// app.use(function(err,req,res){
//     console.log(err)})});
app.use("*", (req, res) => res.status(404).json({error: "not found"}))


export default app

