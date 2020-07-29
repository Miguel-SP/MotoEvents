import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getProfile = id => this.service.get(`/profile/${id}`)

    editProfile = (id, credentials) => this.service.post(`/profile/edit/${id}`, credentials)

    joinEvent = id => this.service.post(`/eventDetails/${id}`)

    unjoinEvent = id => this.service.post(`/eventDetails/deletefromuser/${id}`)

    addFriend = id => this.service.post(`/profile/addfriend/${id}`)
}

export default UserService