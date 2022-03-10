import express from "express";
import Team from '../models/team.model.js'

const router = express.Router()
const getAvg = (nums) => {
    return getSum(nums)/removeNull(nums).length;
}
const getSum = (nums) => {
    let filtered = removeNull(nums);
    return filtered.reduce((acc, a) => acc + a, 0)
}
const removeNull = (nums) => {

    if(nums){
        return nums.filter(function (el) {
            return el != null;
        });
    }
    return [];
}
const flattenTeam = (team) => {

    let teamScout = {}

    if (team.isPitScouted) {
        teamScout = {...team?.pitScout._doc}
        delete teamScout.autoRoutines
        delete teamScout._id
    }


    let data = structorTeam(team);
    return {
        teamNumber: team._id,
        avgContributedCargoScore: getAvg(data.contributedCargoScore),
        avgContributedScore: getAvg(data.contributedScore),
        avgTotalHighShot: getAvg(data.totalLowShot),
        avgTotalHighScored: getAvg(data.totalHighScored),
        avgHighShotAccuracy: getSum(data.totalHighScored)/ getSum(data.totalHighShot),
        avgHighCycleTimePerCargo: getAvg(data.highCycleTimePerCargo),
        avgTotalLowShot: getAvg(data.totalLowShot),
        avgTotalLowScored: getAvg(data.totalLowScored),
        avgLowShotAccuracy: getSum(data.totalLowScored)/ getSum(data.totalLowShot),
        avgLowCycleTimePerCargo: getAvg(data.lowCycleTimePerCargo),
        percentShotHigh: getAvg(data.percentShotHigh),
        avgAutoCargoLow: getAvg(data.autoCargoLow),
        avgAutoCargoHigh: getAvg(data.autoCargoHigh),
        avgAutoOffline: getAvg(data.offLineAuto),
        possibleAutoRoutes: data.possibleAutoRoutes.join(", "),
        avgBreakdowns: getAvg(data.breakdowns),
        climbs: getAvg(data.climbs),
        gamesScouted: data.breakdowns.length,
        gameNotes: data.gameNotes? data.gameNotes.join(", ") : data.gameNotes,
        driveTeamNotes: team.driveTeamNotes.join(", "),

        ...teamScout
    }
}
const structorTeam = (team) => {

    let teamScout = {}
    let autoRoutes = [];
    if(team.isPitScouted){
        teamScout = {...team?.pitScout._doc}

        autoRoutes = teamScout.autoRoutines.map(x => x.joined);
        delete teamScout.autoRoutines
        delete teamScout._id
    }


    return {
        gameCodes: team.games.map((game) => game._id),
        contributedCargoScore: team.games.map((game) => game.cargoScore),
        contributedScore: team.games.map((game) => game.score),
        totalHighShot: team.games.map((game) => game.cargoShotHigh),
        totalHighScored: team.games.map((game) => game.cargoScoredHigh),
        avgHighCycleTimePerCargo: team.games.map((game) => game.cycles).map(cycles => getAvg(cycles.filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall))),
        highShotAccuracy: team.games.map((game) => game.percentScoredHigh),
        totalLowShot: team.games.map((game) => game.cargoShotLow),
        totalLowScored: team.games.map((game) => game.cargoScoredLow),
        lowShotAccuracy: team.games.map((game) => game.percentScoredLow),
        avgLowCycleTimePerCargo: team.games.map((game) => game.cycles).map(cycles => getAvg(cycles.filter((cycle) => cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall))),
        percentShotHigh: team.games.map((game) => game.percentShotHigh),
        autoCargoLow: team.games.map((game) => game.auto.cargoLow),
        autoCargoHigh: team.games.map((game) => game.auto.cargoHigh),
        offLineAuto: team.games.map((game) => game.auto.offLine),
        climbs: team.games.map((game) => game.climb),
        breakdowns: team.games.map((game) => game.brokeDown),
        gameNotes: team.games.map((game) => game.notes),
        lowCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        possibleAutoRoutes: autoRoutes,
        driveTeamNotes: team.driveTeamNotes,
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
const formatGame = (game) => {
    let formatedGame = {};
    formatedGame.auto = game.auto.joined;


    return {
        cargoShotHigh: game.cargoShotHigh,
        cargoScoredHigh: game.cargoScoredHigh,
        cargoShotLow: game.cargoShotLow,
        cargoScoredLow: game.cargoScoredLow,
        brokeDown: game.brokeDown,
        autoCargoLow: game.auto.cargoLow,
        autoCargoHigh: game.auto.cargoHigh,
        autoOffLine: game.auto.offLine,
        climb: game.climb,
        notes: game.notes,
        cycles: game.cycles,
    }
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
router.route("/:id/game/:matchNumber").get(((req, res, next) => {
    Team.findById({_id: req.params.id}).then((team) => {
        res.send(
            formatGame(team.games.find(x => x._id === req.params.matchNumber))
        )

    }).catch(next)
}))


export default router
