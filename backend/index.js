import app from "./server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()



const port = process.env.PORT || 8000

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.SCOUT_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}
finally {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}