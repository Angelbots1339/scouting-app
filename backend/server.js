import express from "express"
import cors from "cors"
import Teams from "./api/teams.route.js"

const app = express()

app.use(cors())
app.use(express.json())



app.use("/api/v1/teams", Teams)
app.use(function(err,req,res){
    res.status(422).send({error: err.message});
});
app.use("*", (req, res) => res.status(404).json({error: "not found"}))


export default app

