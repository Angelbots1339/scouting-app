import express from "express";
import Team from '../models/team.model.js'

const router = express.Router()
const sturcterTeam = (team) => {

    let teamScout = {}
    if(team.isPitScouted){
        teamScout = {...team?.pitScout._doc}
        delete teamScout.autoRoutines
        delete teamScout._id
    }

    return {

        teamNumber: team._id,
        averageContributedScore: team.games.reduce((total, next) => total + next.score, 0) / team.games.length || 0,
        ...teamScout

    }
}
const sturcterTeams = (teams) => {
    let data =[];
    for (let i = 0; i < teams.length; i++) {
        data.push(sturcterTeam(teams[i]))
    }
    return data
}


router.route("/").get((req, res, next) =>{
    Team.find()
        .then((teams) => {res.send(teams)})
        .catch(next)
})
router.route("/:id").get((req, res, next) =>{
    Team.findById(req.params.id)
        .then((team) => {res.send(team)})
        .catch(next)
})
router.route("/:id/data").get((req, res, next) =>{
    Team.findById(req.params.id)
        .then((team) => {res.send(sturcterTeam(team))})
        .catch(next)
})
router.route("/data/all").get((req, res, next) =>{
    Team.find()
        .then((teams) => {res.send(sturcterTeams(teams))})
        .catch(next)
})
router.route("/team/scoutNeeded").get((req, res, next) =>{
    Team.find({isPitScouted: false})
        .then((team) => {res.send(team)})
        .catch(next)
})
router.route("/").post (((req, res, next) => {
    Team.create(req.body)
        .then((team) => {res.send(team)})
        .catch(next)
}))
router.route("/:id").put((req, res, next) =>
    Team.findByIdAndUpdate({_id:req.params.id}, req.body, { runValidators: true })
        .then((team) => {res.send(team)})
        .catch(next))

router.route("/:id").delete((req, res, next) =>
    Team.findByIdAndDelete({_id:req.params.id})
        .then((team) => {res.send(team)})
        .catch(next)
    )
router.route("/:id/game").post(((req, res, next) =>{
    Team.findById({_id: req.params.id}).then((team) => {
        team.games.push(req.body)
        team.save()
        res.send(team.games)
    }).catch(next)
}))
router.route("/:id/notes").post(((req, res, next) =>{
    Team.findById({_id: req.params.id}).then((team) => {
        team.notes.push(req.body.note)
        team.save()
        res.send(team.notes)
    }).catch(next)
}))
router.route("/:id/game").get(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        res.send(team.games)
    } ).catch(next)
}))


export default router
