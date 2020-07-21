import axios from 'axios'

class EventService {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllEvents = () => this.service.get('/eventList')
    getEventDetails = id => this.service.get(`/eventDetails/${id}`)
    createEvent = event => this.service.post('/newEvent', event)
    searchEvents = events => this.service.post('/search', events)
    filteredEvents = events => this.service.get('/filter', events)
}

export default EventService