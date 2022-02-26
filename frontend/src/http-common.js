import axios from "axios";
export default axios.create({
    baseURL: "https://scouting-app-angelbotics.herokuapp.com/api/v1/teams/",
    headers: {
        "Content": "application/json"
    }
})