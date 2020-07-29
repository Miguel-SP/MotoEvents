import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getProfile = id => this.service.get(`/profile/${id}`)

    getPublicProfile = id => this.service.get(`/profile/public/${id}`)

    editProfile = (id, credentials) => this.service.post(`/profile/edit/${id}`, credentials)

    joinEvent = id => this.service.post(`/eventDetails/addevent/${id}`)

    unjoinEvent = id => this.service.post(`/eventDetails/deletefromuser/${id}`)

    addFriend = id => this.service.post(`/profile/addfriend/${id}`)
}

export default UserService