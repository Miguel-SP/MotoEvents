import axios from 'axios'

class EventService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getEventDetails = id => this.service.get(`/eventDetails/${id}`)
    createEvent = event => this.service.post('/newEvent', event)
    searchEvents = name => this.service.post('/search', name)
    getAllEvents = () => this.service.get('/eventList')
}

export default EventService