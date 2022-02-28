import express from "express";
import Team from '../models/team.model.js'

const router = express.Router()
const flattenTeam = (team) => {

    let teamScout = {}
    if (team.isPitScouted) {
        teamScout = {...team?.pitScout._doc}
        delete teamScout.autoRoutines
        delete teamScout._id
    }
    const getAvg = (nums) => {
      return nums.reduce((acc, a) => acc + a, 0)/nums.length;
    }

    let data = structorTeam(team);
    return {
        teamNumber: team._id,
        climbs: getAvg(data.climbs),
        percentScoredHigh: getAvg(data.percentScoredHigh),
        percentScoredLow: getAvg(data.percentScoredLow),
        percentShotHigh: getAvg(data.percentShotHigh),
        avgAutoCargoLow: getAvg(data.autoCargoLow),
        avgAutoCargoHigh: getAvg(data.autoCargoHigh),
        avgContributedScore: getAvg(data.contributedScore),
        avgLowCycleTimePerCargo: getAvg(data.lowCycleTimePerCargo),
        avgHighCycleTimePerCargo: getAvg(data.highCycleTimePerCargo),

        ...teamScout
    }
}
const structorTeam = (team) => {

    let teamScout = {}
    if(team.isPitScouted){
        teamScout = {...team?.pitScout._doc}
        delete teamScout.autoRoutines
        delete teamScout._id
    }

    return {
        teamNumber: team._id,
        climbs: team.games.map((game) => game.climb),
        percentScoredHigh: team.games.map((game) => game.percentScoredHigh),
        percentScoredLow: team.games.map((game) => game.percentScoredLow),
        percentShotHigh: team.games.map((game) => game.percentShotHigh),
        autoCargoLow: team.games.map((game) => game.auto.cargoLow),
        autoCargoHigh: team.games.map((game) => game.auto.cargoHigh),
        contributedScore: team.games.map((game) => game.score),
        lowCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        highCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        ...teamScout
    }
}

const flattenTeams = (teams) => {
    let data = [];
    for (let i = 0; i < teams.length; i++) {
        data.push(flattenTeam(teams[i]))
    }
    return data
}


router.route("/").get((req, res, next) => {
    Team.find()
        .then((teams) => {
            res.send(teams)
        })
        .catch(next)
})
router.route("/:id").get((req, res, next) => {
    Team.findById(req.params.id)
        .then((team) => {
            res.send(team)
        })
        .catch(next)
})
router.route("/:id/flatdata").get((req, res, next) => {
    Team.findById(req.params.id)
        .then((team) => {
            res.send(flattenTeam(team))
        })
        .catch(next)
})
router.route("/:id/data").get((req, res, next) => {
    Team.findById(req.params.id)
        .then((team) => {
            res.send(structorTeam(team))
        })
        .catch(next)
})
router.route("/flatdata").get((req, res, next) => {
    Team.find()
        .then((teams) => {
            res.send(flattenTeams(teams))
        })
        .catch(next)
})
router.route("/team/scoutNeeded").get((req, res, next) => {
    Team.find({isPitScouted: false})
        .then((team) => {
            res.send(team)
        })
        .catch(next)
})
router.route("/").post(((req, res, next) => {
    Team.create(req.body)
        .then((team) => {
            res.send(team)
        })
        .catch(next)
}))
router.route("/:id").put((req, res, next) =>
    Team.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
        .then((team) => {
            res.send(team)
        })
        .catch(next))

router.route("/:id").delete((req, res, next) =>
    Team.findByIdAndDelete({_id: req.params.id})
        .then((team) => {
            res.send(team)
        })
        .catch(next)
)
router.route("/:id/game").post(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        team.games.push(req.body)
        team.save()
        res.send(team.games)
    }).catch(next)
}))
router.route("/:id/notes").post(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        team.notes.push(req.body.note)
        team.save()
        res.send(team.notes)
    }).catch(next)
}))
router.route("/:id/game").get(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        res.send(team.games)
    }).catch(next)
}))


export default router
