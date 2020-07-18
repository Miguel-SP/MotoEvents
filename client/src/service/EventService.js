import axios from 'axios'

class EventService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000'
        })
    }

    getAllEvents = () => this.service.get('/eventList')

    getEventDetails = id => this.service.get(`/eventDetails/${id}`)
}

export default EventService