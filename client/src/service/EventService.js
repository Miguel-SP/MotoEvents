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
    updateEvent = (id, event) => this.service.post(`/eventDetails/update/${id}`, event)
    deleteEvent = id => this.service.post(`eventDetails/delete/${id}`)
    userJoined = id => this.service.post(`/eventDetails/join/${id}`)
    userUnjoin = id => this.service.post(`/eventDetails/deletefromevent/${id}`)
    createComment = (id, data) => this.service.post(`/eventDetails/newcomment/${id}`, data)


}

export default EventService