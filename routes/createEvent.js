const { Router } = require('express');
const router = new Router();

const { addEventID } = require('../models/eventID');



router.post('/event', async (req, res) =>{
    const eventInfo  = await req.body;
    const event = await addEventID(eventInfo);

    console.log(eventInfo)
    let msg = {
        // Default meddelande
        Succes: true,
        Status: 200,
        Message: "Added Event"
    }
    res.send(msg);
    return;
    
})

module.exports = router;