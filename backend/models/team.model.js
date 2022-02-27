import mongoose from "mongoose";

const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
autoRoutine.virtual('score').get(function() { return  (this.cargoLow * 2 + this.cargoHigh * 4 + (this.offline? 2 : 0) )})
const pitScout = new mongoose.Schema({
    //-----GeneralRobotInfo------
    driveTrainType: String,
    areFalconsLoctited: Boolean,
    robotLength: Number,
    robotWidth: Number,
    experienceInYears: Number,
    wiringOrganization: Number,
    motorCount: Number,
    batteryCount: Number,
    adultOnDriveTeam: Boolean,

    cargoHold: Number,
    groundPickUp: Boolean,
    terminalPickUp: Boolean,
    canShootInLow: Boolean,
    canShootInHigh: Boolean,


    autoRoutines: [autoRoutine],

    climbHeight: String,
    climbConfidence: Number,

    hasRedFlags: Boolean,
    redFlags: String,
    notes: String,
})

//cycles: [cycleTime: cycleTime,
//             HighGoal: false,
//             cargoShot: 1,
//             cargoScored: 1],
//                 cargoShotLow,
//                 cargoShotHigh,
//                 cargoScoredLow,
//                 cargoScoredHigh,
//                 notes,
//                 brokeDown,
//                 auto,
//                 climb
const cycle = new mongoose.Schema({
    cycleTime: Number,
    HighGoal: Boolean,
    cargoShot: Number,
    cargoScored: Number
})

cycle.virtual('score').get(function() {
    return (this.HighGoal? 2 : 1) * this.cargoScored;
})

const gameScout = new mongoose.Schema({
    cargoShotLow: Number,
    cargoShotHigh: Number,
    cargoScoredLow: Number,
    cargoScoredHigh: Number,
    notes: String,
    brokeDown: Number,
    auto: autoRoutine,
    climb: Number,
    cycles: [cycle]

})

gameScout.virtual('score').get(function() {
    let climbPoints = 0;
    switch (this.climb){
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
    }
    let acc = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        acc += this.cycles[i].score;

    }

    return acc + climbPoints + this.auto.score + this.cargoScoredHigh * 2 + this.cargoScoredLow;
})

const teamSchema = new mongoose.Schema({
    _id: Number,
    isPitScouted: {
        type: Boolean,
        default: false
    },
    pitScout: pitScout,
    games: [gameScout],
    notes: String,
    driveTeamNotes: [String]
});


const team = mongoose.model('team', teamSchema)

export default team

