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
    let acc = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        acc += this.cycles[i].score;

    }
    return acc + this.cargoScoredHigh * 2 + this.cargoScoredLow;
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

gameScout.virtual('highCargoScored').get(function() {
    let acc = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        acc += this.cycles[i].HighGoal? this.cycles[i].cargoScored : 0;
    }
    return acc + this.cargoScoredHigh;
})
gameScout.virtual('lowCargoScored').get(function() {
    let acc = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        acc += !this.cycles[i].HighGoal? this.cycles[i].cargoScored : 0;
    }
    return acc + this.cargoScoredLow;
})
gameScout.virtual('percentScoredHigh').get(function() {
    let shotInCycles = 0;
    let scoredInCycles = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        if(this.cycles[i].HighGoal){
            shotInCycles += this.cycles[i].cargoShot;
            scoredInCycles += this.cycles[i].cargoScored;
        }
    }
    return (scoredInCycles/shotInCycles + this.cargoScoredHigh/this.cargoShotHigh)/2;
})
gameScout.virtual('percentScoredLow').get(function() {
    let shotInCycles = 0;
    let scoredInCycles = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        if(!this.cycles[i].HighGoal){
            shotInCycles += this.cycles[i].cargoShot;
            scoredInCycles += this.cycles[i].cargoScored;
        }
    }
    return (scoredInCycles/shotInCycles + this.cargoScoredLow/this.cargoShotLow)/2;
})
gameScout.virtual('percentShotHigh').get(function() {
    let shotHigh = 0;
    let totalShot = 0;
    for (let i = 0; i < this.cycles.length; i++) {
        totalShot += this.cycles[i].cargoShot;
        shotHigh += this.cycles[i].HighGoal? this.cycles[i].cargoShot : 0;
    }
    return (shotHigh/totalShot + this.cargoShotHigh/(this.cargoShotHigh + this.cargoShotLow))/2;
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

