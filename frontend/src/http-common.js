import axios from "axios";
export default axios.create({
    //baseURL: "http://localhost:8000/api/v1/teams/",
    baseURL: "https://scouting-app-angelbotics.herokuapp.com/api/v1/teams/",
    headers: {
        "Content": "application/json"
    }
})