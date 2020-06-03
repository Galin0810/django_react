import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class LeadsService{

    constructor(){}


    getLeads() {
        const url = `${API_URL}/api/leads/`;
        return axios.get(url).then(response => response.data);
    }
    getLeadsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getLead(id) {
        const url = `${API_URL}/api/leads/${id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteLead(lead){
        const url = `${API_URL}/api/leads/${lead.id}`;
        return axios.delete(url);
    }
    createLead(lead){
        const url = `${API_URL}/api/leads/`;
        return axios.post(url,lead);
    }
    updateLead(lead){
        const url = `${API_URL}/api/leads/${lead.id}`;
        return axios.put(url,lead);
    }
}