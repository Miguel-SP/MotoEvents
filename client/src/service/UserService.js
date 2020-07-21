import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    myEvents = () => this.service.get(`/myEvents`)
}

export default UserService