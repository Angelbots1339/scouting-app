import mongoose from "mongoose";

const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
autoRoutine.virtual('score').get(function() {
    return this.cargoLow * 2 + this.cargoHigh * 4 + this.offLine;
});
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


    autoRoutines:[autoRoutine],

    climbHeight: String,
    climbConfidence: Number,

    hasRedFlags: Boolean,
    redFlags: String,
    notes: String,
})

const cycles = new mongoose.Schema({
    cycleTime: Number,
    cargoShot: Number,
    HighGoal: Boolean,
    cargoScored: Number
})
cycles.virtual("score").get(() => this.cargoScoredLow + this.cargoScoredHigh * 2)

const gameScout = new mongoose.Schema({
    auto: autoRoutine,
    cycles: [cycles],
    climb: Number, //climb failed = -1
    brokeDown: Boolean,
    notes: String,
    cargoShotLow : Number,
    cargoShotHigh : Number,
    cargoScoredLow : Number,
    cargoScoredHigh : Number,
})

cycles.virtual("score").get(() => this.auto.score + this.cycles.reduce((sum, value) =>  sum + value.score));



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

/**setCycleList([...cycleList, {
 cycleTime: cycleTime,
 HighGoal: false,
 cargoShot: 1,
 cargoScored: 1
 }])**/




const team = mongoose.model('team', teamSchema)

export default team

