import express from "express";
import Event from '../models/event.model.js'

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


    let data = structTeam(team);
    return {
        teamNumber: team._id,
        avgContributedCargoScore: getAvg(data.contributedCargoScore),
        avgContributedScore: getAvg(data.contributedScore),
        avgTotalHighShot: getAvg(data.totalHighShot),
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
const structTeam = (team) => {

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
        highShotAccuracy: team.games.map((game) => game.percentScoredHigh),
        avgHighCycleTimePerCargo: team.games.map((game) => game.cycles).map(cycles => getAvg(cycles.filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall))),
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
        driveTeamNotes: team.driveTeamNotes,
        lowCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => !cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        highCycleTimePerCargo: team.games.map((game) => game.cycles).flat().filter((cycle) => cycle.HighGoal).map((cycle) => cycle.cycleTimePerBall),
        possibleAutoRoutes: autoRoutes,

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



// router.route("/delete/all/match").delete((req, res, next) => {
//     Competition.find()
//         .then((teams) => {
//             res.send(teams)
//             for (let i = 0; i < teams.length; i++) {
//                 teams[i].games = [];
//                 teams[i].save();
//             }
//
//         })
//         .catch(next)
// })


router.route("/events").get((req, res, next) => {
    Event.find()
        .then((teams) => {
            res.send(teams)
        })
        .catch(next)
})
router.route("/event/:event/stats").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(flattenTeams(event.teams))
        })
        .catch(next)
})


router.route("/event/:event").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((team) => {
            res.send(team)
        })
        .catch(next)
})
router.route("/event/:event/teams").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(event.teams)
        })
        .catch(next)
})

router.route("/event/:event/teams/pitScouted").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(event.teams.find({isPitScouted: false}))
        })
        .catch(next)
})




router.route("/event/:event/team/:team").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(event.teams.id(req.params.team))
        })
        .catch(next)
})

router.route("/event/:event/team/:team/games").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(event.teams.id(req.params.team).games)
        })
        .catch(next)
})
router.route("/event/:event/team/:team/games/stats").get((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            res.send(structTeam(event.teams.id(req.params.team)))
        })
        .catch(next)
})


router.route("/event").post(((req, res, next) => {
    Event.create(req.body)
        .then((event) => {
            res.send(event)
        })
        .catch(next)
}))
router.route("/event/:event/team").post(((req, res, next) => {
    Event.findById(req.params.event)
        .then((event) => {
            event.teams.push(req.body)
            event.save()
            res.send(req.body)
        })
        .catch(next)
}))

router.route("/event/:event/team/:team/game").post(((req, res, next) => {
    Event.findById(req.params.event).then((event) => {
        event.teams.id(req.params.team).games.push(req.body)
        event.save()
        res.send(event.teams.id(req.params.team))
    }).catch(next)
}))

router.route("/event/:event/team/:team/note").post(((req, res, next) => {
    Event.findById({_id: req.params.id}).then((event) => {
        event.teams.id(req.params.team).driveTeamNotes.push(req.body.note)
        event.save()
        res.send(event.teams.id(req.params.team))
    }).catch(next)
}))

router.route("/event/:event").put((req, res, next) =>
    Event.findByIdAndUpdate({_id: req.params.event}, req.body, {runValidators: true})
        .then((event) => {
            res.send(event)
        })
        .catch(next))

router.route("/event/:event/team/:team").put((req, res, next) =>
    Event.findById({_id: req.params.id})
        .then((event) => {
            event.teams.id(req.params.team).set(req.body)
            event.save()
            res.send(event.teams.id(req.params.team))
        })
        .catch(next))

router.route("/event/:event").delete((req, res, next) =>
    Event.findByIdAndDelete({_id: req.params.event})
        .then((team) => {
            res.send(team)
        })
        .catch(next)
)
router.route("/event/:event/team/:team").delete((req, res, next) =>
    Event.findByIdAndDelete({_id: req.params.event})
        .then((event) => {
            event.teams.pull(req.params.team)
        })
        .catch(next)
)


export default router
