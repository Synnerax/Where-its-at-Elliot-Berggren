const { v4: uuidv4 } = require('uuid');
const { addTicketID } = require('../models/database-functions');

module.exports = {
    async addTicket(EventName) {
        const ticketID = uuidv4();
        console.log(EventName.Name);
        console.log(ticketID);
        const data = await addTicketID(EventName.Name, ticketID)

        let msg = await {
            // Default meddelande
            TicketID: ticketID,
            Event: EventName.Name,
        }
        return await msg;
    }
}

