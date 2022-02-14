import http from '../http-common';
class TeamDataService {
    getAllTeams(){
        return http.get('/');
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
}


export default new TeamDataService();