import express from "express";
import Event from '../models/event.model.js'

const router = express.Router()
const getAvg = (nums) => {
    return getSum(nums)/removeNull(nums).length;
}
const climbToScore = (level) => {
    let climbPoints = 0;
    switch (level){
        case 1:
            climbPoints = 4
            break
        case 2:
            climbPoints = 6
            break
        case 3:
            climbPoints = 10
            break
        case 4:
            climbPoints = 15
            break
    }
    return climbPoints;
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
    let qualityCheck = {};

    if (team.isPitScouted) {
        teamScout = {...team?.pitScout._doc}
        delete teamScout.autoRoutines
        delete teamScout._id
    }
    if(team.qualityCheck){
        qualityCheck = {...team?.qualityCheck._doc}
        let date = new Date(qualityCheck.timeStamp)
        qualityCheck.timeStamp = date.getDate()+
            "/"+(date.getMonth()+1);
        delete qualityCheck._id
    }



    let data = structTeam(team);
    return {
        teamNumber: team._id,
        avgContributedScore: getAvg(data.contributedScore),
        histContributedScore: data.contributedScore.join(","),
        avgContributedCargoScore: getAvg(data.contributedCargoScore),
        histContributedCargoScore: data.contributedCargoScore.join(","),
        avgClimbScore:  getAvg(data.climbs.map(climb => climbToScore(climb))),
        histClimbScore: data.climbs.map(climb => climbToScore(climb)).join(","),
        avgAutoScore: getAvg(team.games.map(game => game.auto.score)),
        histAutoScore: team.games.map(game => game.auto.score).join(", "),
        avgTotalHighShot: getAvg(data.totalHighShot),
        avgTotalHighScored: getAvg(data.totalHighScored),
        avgHighShotAccuracy: getSum(data.totalHighScored)/ getSum(data.totalHighShot),
        highCargoHist: data.totalHighScored.map((val, i) => `${val}/${data.totalHighShot[i]}`).join(","),
        avgTotalLowShot: getAvg(data.totalLowShot),
        avgTotalLowScored: getAvg(data.totalLowScored),
        avgLowShotAccuracy: getSum(data.totalLowScored)/ getSum(data.totalLowShot),
        lowCargoHist: data.totalLowScored.map((val, i) => `${val}/${data.totalLowShot[i]}`).join(","),
        highestTotalCargo: Math.max(...data.totalLowScored.map((low, i) => low + data.totalHighScored[i])),
        avgTotalCargo: getAvg(data.totalLowScored.map((low, i) => low + data.totalHighScored[i])),
        percentOfGamesPlayedDefense: getAvg(data.playedDefence),
        avgHerdingBallsRating: getAvg(team.games.filter(game => game.playedDefence).map(game => game.herdingBallsRating)),
        avgBotDefenceRating: getAvg(team.games.filter(game => game.playedDefence).map(game => game.botDefenceRating)),
        defenceHist: team.games.map(game => game.playedDefence? `herd:${game.herdingBallsRating} bot:${game.botDefenceRating} ${game.defenceNotes}`: ""),
        percentShotHigh: getAvg(data.percentShotHigh),
        avgAutoCargoLow: getAvg(data.autoCargoLow),
        avgAutoCargoHigh: getAvg(data.autoCargoHigh),
        highestAutoTotalCargo: Math.max(...data.autoCargoLow.map((low, i) => low + data.autoCargoHigh[i])),
        avgAutoTotalCargo: getAvg(data.autoCargoLow.map((low, i) => low + data.autoCargoHigh[i])),
        avgAutoOffline: getAvg(data.offLineAuto),
        autoHist: team.games.map(game => game.auto.joinedNoPosition).join(", "),
        possibleAutoRoutes: data.possibleAutoRoutes.join(", "),
        climbLevels: data.climbs.join(","),
        highestClimbScore: Math.max(...data.climbs.map(climb => climbToScore(climb))),
        avgBroke: getAvg(data.broke),
        avgCompleteBreakDown: getAvg(data.completeBreakDown),
        breaks: team.games.map(game => game.broke? `${game.brokeNotes}${game.completeBreakDown? "> DIED" : ""}` : "").join(', '),
        gamesScouted: data.gameCodes.length,
        avgDriverQuality: getAvg(data.driverQuality),
        histDriverQuality: data.driverQuality.join(","),
        ...qualityCheck,
        ...teamScout,
        gameNotes: data.gameNotes? data.gameNotes.join(", ") : data.gameNotes,
        driveTeamNotes: team.driveTeamNotes.join(", "),
    }
}
const structTeam = (team) => {

    let teamScout = {}
    let autoRoutes = [];
    let qualityCheck = {};
    if(team.isPitScouted){
        teamScout = {...team?.pitScout._doc}

        autoRoutes = teamScout.autoRoutines.map(x => x.joined);
        delete teamScout.autoRoutines
        delete teamScout._id
    }
    if(team.qualityCheck){
        qualityCheck = {...team?.qualityCheck._doc}
        let date = new Date(qualityCheck.timeStamp)
        qualityCheck.timeStamp = date.getDate()+
            "/"+(date.getMonth()+1);
        delete qualityCheck._id
    }

    //team.games.sort((a, b) => a.match(/\d+$/) - b.match(/\d+$/));



    return {
        gameCodes: team.games.map(game => game._id),
        contributedCargoScore: team.games.map(game => game.cargoScore),
        contributedScore: team.games.map(game => game.score),
        totalHighShot: team.games.map(game => game.cargoShotHigh),
        totalHighScored: team.games.map(game => game.cargoScoredHigh),
        highShotAccuracy: team.games.map(game => game.percentScoredHigh),
        totalLowShot: team.games.map(game => game.cargoShotLow),
        totalLowScored: team.games.map(game => game.cargoScoredLow),
        lowShotAccuracy: team.games.map(game => game.percentScoredLow),
        percentShotHigh: team.games.map(game => game.percentShotHigh),
        playedDefence: team.games.map(game => game.playedDefence),
        herdingBallsRating: team.games.map(game => game.herdingBallsRating),
        botDefenceRating: team.games.map(game => game.botDefenceRating),
        autoCargoLow: team.games.map(game => game.auto.cargoLow),
        autoCargoHigh: team.games.map(game => game.auto.cargoHigh),
        offLineAuto: team.games.map(game => game.auto.offLine),
        climbs: team.games.map(game => game.climb),
        broke:team.games.map(game => game.broke),
        completeBreakDown: team.games.map(game => game.completeBreakDown),
        defenceNotes: team.games.map(game => game.defenceNotes),
        brokeNotes: team.games.map(game => game.brokeNotes),
        driverQuality: team.driverQuality,
        gameNotes: team.games.map((game) => game.notes),
        driveTeamNotes: team.driveTeamNotes,
        possibleAutoRoutes: autoRoutes,
        qualityCheck,
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
        .then((events) => {
            res.send(events)
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
            res.send(event.teams.filter(team => team.isPitScouted))
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
    Event.findById({_id: req.params.event}).then((event) => {
        event.teams.id(req.params.team).driveTeamNotes.push(req.body.note)
        event.save()
        res.send(event.teams.id(req.params.team))
    }).catch(next)
}))
router.route("/event/:event/team/:team/drive").post(((req, res, next) => {
    Event.findById({_id: req.params.event}).then((event) => {
        event.teams.id(req.params.team).driverQuality.push(req.body.driverQuality)
        event.save()
        res.send(event.teams.id(req.params.team))
    }).catch(next)
}))

router.route("/event/:event/team/:team/qualitycheck").post(((req, res, next) => {
    Event.findById({_id: req.params.event}).then((event) => {
        event.teams.id(req.params.team).qualityCheck = req.body;
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
    Event.findById({_id: req.params.event})
        .then((event) => {
            event.teams.id(req.params.team).set(req.body)
            event.save()
            res.send(event.teams.id(req.params.team))
        })
        .catch(next))
//
// router.route("/event/:event").delete((req, res, next) =>
//     Event.findByIdAndDelete({_id: req.params.event})
//         .then((team) => {
//             res.send(team)
//         })
//         .catch(next)
// )
// router.route("/event/:event/team/:team").delete((req, res, next) =>
//     Event.findByIdAndDelete({_id: req.params.event})
//         .then((event) => {
//             event.teams.pull(req.params.team)
//             res.send(req.params.team)
//         })
//         .catch(next)
// )


export default router
