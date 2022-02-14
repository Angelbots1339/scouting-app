import express from "express";
import Team from '../models/team.model.js'

const router = express.Router()

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
router.route("/:id/game").get(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        res.send(team.games)
    } )
}))


export default router
