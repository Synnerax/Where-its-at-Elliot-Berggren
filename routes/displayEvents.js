const { Router } = require('express');
const router = new Router();

const { getEvents, getEvent } = require('../models/database-functions');


router.get("/all", async (req, res) => {
    const events = await getEvents();
    let msg = {
        // Default meddelande
        Succes: true,
        Status: 200,
        Message: "Displaying Database"
    }

    

    console.log(msg);
    res.send(JSON.stringify(events));
});

router.get('/one', async (req, res) => {
    const productId = await req.query.id;
    const event = await getEvent(productId);
    
    res.send(JSON.stringify(event));
    

})



module.exports = router;