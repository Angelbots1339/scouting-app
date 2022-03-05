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
gameScout.virtual('cargoScore').get(function() {
    return this.cargoScoredHigh * 2 + this.cargoScoredLow;
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
    games: [gameScout],
    driveTeamNotes: [String]
});


const team = mongoose.model('team', teamSchema)

export default team

