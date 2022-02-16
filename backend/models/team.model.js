import mongoose from "mongoose";

const autoRoutine = new mongoose.Schema({
    position: Number,
    cargoLow: Number,
    cargoHigh: Number,
    offLine: Boolean
})
const pitScout = new mongoose.Schema({
    experienceInYears: {
        type: Number,
        required: true
    },
    wiringOrganization:{ //On a scale from 0 to 5
      type: Number,
      min: 0,
      max: 5,
      required: true
    },
    climbHeight:{
        type: String,
        required: true
    },
    autoRoutines:{
        type:[autoRoutine]
    },

    canShootInLow:{
        type: Boolean
    },
    canShootInHigh:{
        type: Boolean
    },
    redFlags:{
        type: String,
    },
    notes:{
        type: String
    }
})
const gameScout = new mongoose.Schema({
    pointsScored: Number
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

