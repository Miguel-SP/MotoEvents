import axios from 'axios'

class EventService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api'
        })
    }

    getAllEvents = () => this.service.get('/eventList')
    getEventDetails = id => this.service.get(`/eventDetails/${id}`)
    createEvent = event => this.service.post('/newEvent', event)

}

export default EventService