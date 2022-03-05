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
        if(nums){
            return nums.reduce((acc, a) => acc + a, 0)/nums.length;
        }
        return []

    }

    let data = structorTeam(team);
    return {
        teamNumber: team._id,
        climbs: getAvg(data.climbs),
        avgHighShotAccuracy: getAvg(data.highShotAccuracy),
        avgTotalHighScored: getAvg(data.totalHighScored),
        avgLowShotAccuracy: getAvg(data.lowShotAccuracy),
        avgTotalLowScored: getAvg(data.totalLowScored),
        percentShotHigh: getAvg(data.percentShotHigh),
        avgAutoCargoLow: getAvg(data.autoCargoLow),
        avgAutoCargoHigh: getAvg(data.autoCargoHigh),
        avgAutoOffline: getAvg(data.offLineAuto),
        avgContributedScore: getAvg(data.contributedScore),
        avgContributedCargoScore: getAvg(data.contributedCargoScore),
        avgLowCycleTimePerCargo: getAvg(data.lowCycleTimePerCargo),
        avgHighCycleTimePerCargo: getAvg(data.highCycleTimePerCargo),
        avgBreakdowns: getAvg(data.breakdowns),

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
        climbs: team.games.map((game) => game.climb),
        highShotAccuracy: team.games.map((game) => game.percentScoredHigh),
        totalHighScored: team.games.map((game) => game.cargoScoredHigh),
        lowShotAccuracy: team.games.map((game) => game.percentScoredLow),
        totalLowScored: team.games.map((game) => game.cargoScoredLow),
        percentShotHigh: team.games.map((game) => game.percentShotHigh),
        autoCargoLow: team.games.map((game) => game.auto.cargoLow),
        autoCargoHigh: team.games.map((game) => game.auto.cargoHigh),
        offLineAuto: team.games.map((game) => game.auto.offLine),
        contributedScore: team.games.map((game) => game.score),
        contributedCargoScore: team.games.map((game) => game.cargoScore),
        lowCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        highCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        breakdowns: team.games.map((game) => game.brokeDown),
        notes: team.driveTeamNotes.join(", "),

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
router.route("/flatdata").get((req, res, next) => {
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
router.route("/data/flat").get((req, res, next) => {
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
        team.driveTeamNotes.push(req.body.note)
        team.save()
        res.send(team.driveTeamNotes)
    }).catch(next)
}))
router.route("/:id/game").get(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        res.send(team.games)
    }).catch(next)
}))


export default router
