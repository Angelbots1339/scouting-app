import http from '../http-common';
class TeamDataService {
    getAllTeams(){
        return http.get('/');
    }
    getAllTeamsFlattenedData(){
        return http.get('/data/flat');
    }
    getTeam(teamNumber){
        return http.get(`/${teamNumber}`);
    }
    updateTeam(teamNumber, data){
        return http.put(`/${teamNumber}`, data);
    }
    postTeam(data){
        return http.post('/', data)
    }
    deleteTeam(teamNumber){
        return http.delete(`/${teamNumber}`)
    }
    getScoutNeededTeams(){
        return http.get('/team/scoutNeeded');
    }

    addGame(teamNumber, data){
        return http.post(`/${teamNumber}/game`, data)
    }
    addNote(teamNumber, note){
        return http.post(`/${teamNumber}/notes`, {note: note})
    }


    // addTeam(teamNumber){
    //     return http.post('/', {_id: teamNumber})
    // }
}


export default new TeamDataService();