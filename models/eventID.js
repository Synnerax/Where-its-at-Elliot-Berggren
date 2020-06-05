const { v4: uuidv4 } = require('uuid');
const { createEvent } = require('../models/database-functions');

module.exports = {
    async addEventID(event) {
        const eventID = uuidv4();
        const data = await createEvent(event.Name, event.Where, event.Date, event.From, event.To, event.Tickets, event.Price, eventID)
        return await data;
    }
}

// event.Name, event.Where, event.Date, event.From, event.To, event.Tickets, event.Price