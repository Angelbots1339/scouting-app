import mongoose from "mongoose";

const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
autoRoutine.virtual('score').get(function() { return  (this.cargoLow * 2 + this.cargoHigh * 4 + (this.offLine? 2 : 0) )})
autoRoutine.virtual('joined').get(function() {
    return `Position:${this.position} ${this.cargoLow !== 0? `Low:${this.cargoLow} ` : ""}${this.cargoHigh !== 0? `High:${this.cargoHigh} ` : ""}${this.offLine? "Goes Off line" : ""}`;
})

const pitScout = new mongoose.Schema({
    //-----GeneralRobotInfo------
    driveTrainType: String,
    motorType: String,
    motorCount: Number,
    batteryCount: Number,
    areFalconsLoctited: Boolean,
    bumperQuality: String,
    wiringOrganization: Number,
    cargoHold: Number,
    climbHeight: String,
    climbConfidence: Number,

    experienceInYears: Number,
    groundPickUp: Boolean,
    terminalPickUp: Boolean,
    canShootInLow: Boolean,
    canShootInHigh: Boolean,
    autoRoutines:[autoRoutine],

    hasRedFlags: Boolean,
    redFlags: String,
    notes: String,
})


const cycle = new mongoose.Schema({
    cycleTime: Number,
    HighGoal: Boolean,
    cargoShot: Number,
    cargoScored: Number
})

cycle.virtual('score').get(function() {
    return (this.HighGoal? 2 : 1) * this.cargoScored;
})

cycle.virtual('cycleTimePerBall').get(function() {
    return this.cycleTime/this.cargoScored ;
})



const gameScout = new mongoose.Schema({
    _id: String,
    cargoShotLow: Number,
    cargoShotHigh: Number,
    cargoScoredLow: Number,
    cargoScoredHigh: Number,
    playedDefence: Boolean,
    herdingBallsRating: Number,
    botDefenceRating: Number,
    defenceNotes: String,
    notes: String,
    brokeDown: Number,
    auto: autoRoutine,
    climb: Number

})
const qualityCheck = new mongoose.Schema({
    timeStamp: Number,
    driveBaseRating: Number,
    superStructureRating: Number,
    bumperRating: Number,
    mechanicalNotes: String,
    electricalRating: Number,
    electricalNotes: String,
    dnp: {
        type: Boolean,
        default: false
    }
})
gameScout.virtual('cargoScore').get(function() {
    return this.cargoScoredHigh * 2 + this.cargoScoredLow;
})
gameScout.virtual('score').get(function() {
    let climbPoints = 0;
    switch (this.climb){
        case 1:
            climbPoints = 0
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
    return climbPoints + this.auto.score + this.cargoScore;
})


gameScout.virtual('percentScoredHigh').get(function() {

    return this.cargoScoredHigh/this.cargoShotHigh;
})
gameScout.virtual('percentScoredLow').get(function() {
    return this.cargoScoredLow/this.cargoShotLow;
})
gameScout.virtual('percentShotHigh').get(function() {

    return this.cargoShotHigh/(this.cargoShotHigh + this.cargoShotLow);
})



const teamSchema = new mongoose.Schema({
    _id: Number,
    isPitScouted: {
        type: Boolean,
        default: false
    },
    pitScout: pitScout,
    qualityCheck: qualityCheck,
    games: [gameScout],
    driveTeamNotes: [String]
});
const eventSchema = new mongoose.Schema({
    _id: String,
    teams: [teamSchema]
})


const Event = mongoose.model('competition', eventSchema)

export default Event

