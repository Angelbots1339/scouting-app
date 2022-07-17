import axios from "axios";
export default axios.create({
    //baseURL: "http://localhost:8000/api/v1/event/2022code/",
    baseURL: "https://scouting-app-angelbotics.herokuapp.com/api/v1/event/2022iri/",
    headers: {
        "Content": "application/json"
    }
})