import mongoose from "mongoose";

const gameScout = new mongoose.Schema({
    pointsScored: Number
})
const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
const pitScout = new mongoose.Schema({
    //-----GeneralRobotInfo------
    driveTrainType: String,
    usingFalcons: Boolean,
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


    autoRoutines:[autoRoutine],

    climbHeight: String,
    climbConfidence: Number,

    hasRedFlags: Boolean,
    redFlags: String,
    notes: String,
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

