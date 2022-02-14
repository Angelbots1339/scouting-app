import mongoose from "mongoose";

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
    autoCargoScoredHigh:{
        type: String,
        required: true
    },
    autoCargoScoredLow:{
        type: String,
        required: true
    },
    autoOffLine:{
        type: Boolean
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

