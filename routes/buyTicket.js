const { Router } = require('express');
const router = new Router();

const { addTicket } = require('../models/ticketID');


router.post('/', async (req, res) =>{
    const eventInfo  = await req.body;
    const ticket = await addTicket(eventInfo);
    console.log('this is the ticket', ticket)
    let msg = {
        // Default meddelande
        Succes: true,
        Status: 200,
        Message: 'hey'
    }

    const ticketURL = `http://localhost:8000/ticket.html?ticket=${ticket}`
    // res.redirect(ticketURL)
    res.send(JSON.stringify(ticket));
    
    
})


module.exports = router;