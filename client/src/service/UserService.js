import axios from 'axios'

class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    // getProfile = _id => this.service.get(`/profile`, _id)
}

export default UserService