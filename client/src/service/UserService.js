import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getProfile = (id) => this.service.get(`/profile/${id}`)

    joinEvent = id => this.service.post(`/eventDetails/${id}`)

    unjoinEvent = (id, idEvent) => this.service.post(`/eventDetails/deletefromuser/${id}`, idEvent)
}

export default UserService