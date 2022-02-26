import mongoose from "mongoose";

const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
const pitScout = new mongoose.Schema({
    //-----GeneralRobotInfo------
    driveTrainType: String,
    motorType: String,
    bumperQuality: String,
    areFalconsLoctited: Boolean,
    robotLength: Number,
    robotWidth: Number,
    robotHeight: Number,
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


    autoRoutines:[autoRoutine],

    climbHeight: String,
    climbConfidence: Number,


    pitSystem: String,
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

const teamSchema = new mongoose.Schema({
    _id: Number,
    isPitScouted: {
        type: Boolean,
        default: false
    },
    pitScout: pitScout,
    games: [gameScout],
    notes: String
});


const team = mongoose.model('team', teamSchema)

export default team

