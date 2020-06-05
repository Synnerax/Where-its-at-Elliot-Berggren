const { Router } = require('express');
const router = new Router();

const { checkTicket } = require('../models/checkTicketID');


router.post('/', async (req, res) =>{
    // tar ticket ID från som skickats från klienten
    const ticketInfo  = await req.body;

    // skickar vidare Event namnet till addTicket funktionen och sparar svaret
    const ticket = await checkTicket(ticketInfo);
    console.log('this is the ticket', ticket)
    console.log('this is the ticketInfo:', ticketInfo)

    // skickar svaret till klienten
    res.send(JSON.stringify(ticket));
    
    
})


module.exports = router;