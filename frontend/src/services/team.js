import http from '../http-common';
class TeamDataService {
    getAllTeams(){
        return http.get('/teams');
    }
    getAllTeamsFlattenedData(){
        return http.get('/stats');
    }
    getTeam(teamNumber){
        return http.get(`/team/${teamNumber}`);
    }
    updateTeam(teamNumber, data){
        return http.put(`/team/${teamNumber}`, data);
    }
    postTeam(data){
        return http.post('/team', data)
    }
    deleteTeam(teamNumber){
        return http.delete(`/team/${teamNumber}`)
    }
    getScoutNeededTeams(){
        return http.get('/teams/pitscouted');
    }

    addGame(teamNumber, data){
        return http.post(`/team/${teamNumber}/game`, data)
    }
    addNote(teamNumber, note){
        return http.post(`/team/${teamNumber}/notes`, {note: note})
    }
    addDriveQuality(teamNumber, driverQuality){
        return http.post(`/team/${teamNumber}/drive`, {driverQuality: driverQuality})
    }
    addQualityCheck(teamNumber, qualityCheck){
        return http.post(`/team/${teamNumber}/qualitycheck`, qualityCheck)
    }


    // addTeam(teamNumber){
    //     return http.post('/', {_id: teamNumber})
    // }
}


export default new TeamDataService();