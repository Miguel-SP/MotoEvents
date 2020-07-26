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

    unjoinEvent = (id, key) => this.service.post(`/eventDetails/deletefromuser/${id}`, key)
}

export default UserService