const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('events.json')
const database = low(adapter)


module.exports = {
    async getEvents() {
        return await database.get('Events').value();
    },
    async getEvent(eventID) {
        return await database.get('Events').find({id: eventID}).value();
    },
    async createEvent(name, where, date, from, to, tickets, price, id) {
        return await database.get('Events').push({Name: name, Where: where, Date: date, From: from, To: to, Tickets: tickets, Price: price, id: id, Sold: 0}).write();

    },

    async addTicketID(eventName, id){

        database.get('Tickets').push({ id: id, Event: eventName, Redeemed: false}).write()
    },

    async getTickets(ticket) {
        console.log('This is from the database with the ticket ID:', ticket)
        return await database.get("Tickets").find({id: ticket}).value();
    },
    async redeemedTicket(ticket) {
        console.log('Redeemed followig Ticket ID:', ticket)
        return await database.get("Tickets").find({id: ticket}).assign({Redeemed: true }).write();
    },
    async getUser(user) {
        return await database.get('users').find({ uuid: user.uuid }).value();
    },

    async getUserFromUsername(user) {
        return await database.get('users').find({ username: user.username }).value();
    },
    async getUserFromID(ID) {
        return await database.get('users').find({ uuid: id.uuid }).value();
    },
    
    async addUser(uuid, user, pass) {
        return await database.get('users').push({ uuid: uuid, username: user, password: pass, role: 'user' }).write();
    }
}