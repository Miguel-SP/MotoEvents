import axios from 'axios'

class EventService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getEventDetails = id => this.service.get(`/eventDetails/${id}`)
    createEvent = event => this.service.post('/newEvent', event)
    searchEvents = name => this.service.post('/search', name)
    filteredEvents = name => this.service.get('/search', name)
    getAllEvents = () => this.service.get('/eventList')
}

export default EventService