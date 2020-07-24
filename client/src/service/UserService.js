import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    // getProfile = _id => this.service.get(`/profile`, _id)
}

export default UserService